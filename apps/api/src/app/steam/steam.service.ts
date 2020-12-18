import { BadRequestException, forwardRef, HttpService, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SteamProfileEntity } from './steam-profile.entity';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { SteamProfileRepository } from './steam-profile.repository';
import { UserEntity } from '../user/user.entity';
import { environment } from '../environment/environment';
import { RelyingParty } from 'openid';
import { isString } from '@stlmpp/utils';
import { PlayerService } from '../player/player.service';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { PlayerEntity } from '../player/player.entity';
import { RawSteamProfile } from '@biomercs/api-interfaces';

@Injectable()
export class SteamService {
  constructor(
    private http: HttpService,
    private steamProfileRepository: SteamProfileRepository,
    @Inject(forwardRef(() => PlayerService)) private playerService: PlayerService
  ) {}

  private async _createOrReplaceSteamProfile(
    req: Request,
    player?: PlayerEntity,
    returnUrl?: string
  ): Promise<SteamProfileEntity> {
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    if (player.idSteamProfile) {
      throw new BadRequestException('Player already has a Steam Profile linked');
    }
    const rawSteamProfile = await this.authenticate(req, returnUrl);
    let steamProfile = await this.steamProfileRepository.findWithPlayerBySteamid(rawSteamProfile.steamid);
    if (steamProfile) {
      if (steamProfile.player) {
        if (!steamProfile.player.noUser) {
          throw new BadRequestException('Steam profile already has a Player linked to it');
        } else {
          // TODO merge player scores
          await this.playerService.delete(steamProfile.player.id);
          await this.playerService.update(player.id, { idSteamProfile: steamProfile.id });
        }
      } else {
        await this.playerService.update(player.id, { idSteamProfile: steamProfile.id });
        steamProfile.player = player;
      }
    } else {
      steamProfile = await this.add(rawSteamProfile);
      await this.playerService.update(player.id, { idSteamProfile: steamProfile.id });
    }
    return steamProfile;
  }

  @Transactional()
  async authenticateAndLinkUser(req: Request, idUser: number, returnUrl?: string): Promise<SteamProfileEntity> {
    return this._createOrReplaceSteamProfile(req, await this.playerService.findByIdUser(idUser), returnUrl);
  }

  @Transactional()
  async authenticateAndLinkPlayer(req: Request, idPlayer: number, returnUrl?: string): Promise<SteamProfileEntity> {
    return this._createOrReplaceSteamProfile(req, await this.playerService.findById(idPlayer), returnUrl);
  }

  @Transactional()
  async create(steamid: string): Promise<SteamProfileEntity> {
    const rawSteamProfile = await this.getPlayerSummary(steamid);
    if (!rawSteamProfile) {
      throw new NotFoundException('Steam profile not found');
    }
    const steamProfile = (await this.checkIfSteamProfileIsAlreadyLinked(steamid)) ?? (await this.add(rawSteamProfile));
    steamProfile.player = await this.playerService.add({
      personaName: steamProfile.personaname,
      idSteamProfile: steamProfile.id,
      noUser: true,
    });
    return steamProfile;
  }

  async updateSteamProfile(idSteamProfile: number): Promise<SteamProfileEntity> {
    const steamProfile = await this.steamProfileRepository.findOne(idSteamProfile);
    if (!steamProfile?.steamid) {
      throw new BadRequestException('Steam Profile does not exist');
    }
    await this.steamProfileRepository.update(idSteamProfile, await this.getPlayerSummary(steamProfile.steamid));
    return await this.steamProfileRepository.findOneOrFail(idSteamProfile);
  }

  async getPlayerSummary(steamid: string): Promise<RawSteamProfile> {
    return this.http
      .get<{ response: { players: SteamProfileEntity[] } }>(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002`,
        {
          params: {
            key: environment.steamKey,
            steamids: steamid,
          },
        }
      )
      .pipe(map(response => response?.data?.response?.players?.[0]))
      .toPromise();
  }

  getRelyingParty(returnUrl = '/steam/auth'): RelyingParty {
    if (!returnUrl.includes(environment.host)) {
      returnUrl = environment.apiUrl + returnUrl;
    }
    return new RelyingParty(returnUrl, environment.apiUrl, true, true, []);
  }

  async openIdUrl(returnUrl: string): Promise<string>;
  async openIdUrl(user: UserEntity): Promise<string>;
  async openIdUrl(player: PlayerEntity): Promise<string>;
  async openIdUrl(): Promise<string>;
  async openIdUrl(urlOrUser?: string | UserEntity | PlayerEntity): Promise<string> {
    let url = '/steam/auth';
    if (urlOrUser) {
      if (isString(urlOrUser)) {
        url = urlOrUser;
      } else {
        const idType = urlOrUser instanceof UserEntity ? 'idUser' : 'idPlayer';
        url = `${url}?${idType}=${urlOrUser.id}`;
      }
    }
    const relyingParty = this.getRelyingParty(url);
    return new Promise((resolve, reject) => {
      relyingParty.authenticate(environment.steamOpenIDUrl, false, (error, authUrl) => {
        if (error) return reject('Authentication failed: ' + error);
        if (!authUrl) return reject('Authentication failed.');
        resolve(authUrl);
      });
    });
  }

  async authenticate(req: Request, returnUrl?: string): Promise<RawSteamProfile> {
    return new Promise((resolve, reject) => {
      const relyingParty = this.getRelyingParty(returnUrl ?? '');
      relyingParty.verifyAssertion(req, async (error, result) => {
        if (error) return reject(error.message);
        if (!result?.authenticated || !result.claimedIdentifier) {
          return reject('Failed to authenticate user.');
        }
        if (!/^https?:\/\/steamcommunity\.com\/openid\/id\/\d+$/.test(result.claimedIdentifier)) {
          return reject('Claimed identity is not valid.');
        }
        try {
          return resolve(
            await this.getPlayerSummary(result.claimedIdentifier.replace('https://steamcommunity.com/openid/id/', ''))
          );
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  async add(dto: RawSteamProfile): Promise<SteamProfileEntity> {
    return this.steamProfileRepository.save(new SteamProfileEntity().extendDto(dto));
  }

  async checkIfSteamProfileIsAlreadyLinked(steamid: string): Promise<SteamProfileEntity | undefined> {
    const steamProfile = await this.steamProfileRepository.findOne({ where: { steamid } });
    if (!steamProfile) {
      return;
    }
    const player = await this.playerService.findByIdSteamProfile(steamProfile.id);
    if (!player) {
      return steamProfile;
    }
    throw new BadRequestException('Steam profile already registered and linked with one player');
  }

  async findBySteamid(steamid: string): Promise<SteamProfileEntity> {
    return this.steamProfileRepository.findOneOrFail({ where: { steamid } });
  }
}
