import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PlayerRepository } from './player.repository';
import { PlayerEntity } from './player.entity';
import { SteamService } from '../steam/steam.service';
import { RegionService } from '../region/region.service';
import { PlayerAddDto, PlayerUpdateDto } from './player.dto';

@Injectable()
export class PlayerService {
  constructor(
    private playerRepository: PlayerRepository,
    @Inject(forwardRef(() => SteamService)) private steamService: SteamService,
    private regionService: RegionService
  ) {}

  async add(dto: PlayerAddDto & { noUser?: boolean }): Promise<PlayerEntity> {
    if (!dto.idRegion) {
      dto.idRegion = await this.regionService.findDefaultIdRegion();
    }
    return this.playerRepository.save(new PlayerEntity().extendDto(dto));
  }

  async findByIdUser(idUser: number): Promise<PlayerEntity | undefined> {
    return this.playerRepository.findOne({ where: { idUser } });
  }

  async findByIdSteamProfile(idSteamProfile: number): Promise<PlayerEntity | undefined> {
    return this.playerRepository.findOne({ where: { idSteamProfile } });
  }

  async findById(idPlayer: number): Promise<PlayerEntity> {
    const player = await this.playerRepository.findOne(idPlayer, { relations: ['region'] });
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return player;
  }

  async update(idPlayer: number, dto: PlayerUpdateDto): Promise<PlayerEntity> {
    const player = await this.playerRepository.findOneOrFail(idPlayer);
    await this.playerRepository.update(idPlayer, dto);
    if (dto.idRegion && player.idRegion !== dto.idRegion) {
      player.region = await this.regionService.findById(dto.idRegion);
    }
    return new PlayerEntity().extendDto({ ...player, ...dto });
  }

  async delete(idPlayer: number): Promise<void> {
    await this.playerRepository.delete(idPlayer);
  }

  async linkSteamProfile(idPlayer: number): Promise<string> {
    const player = await this.findById(idPlayer);
    if (player.idSteamProfile) {
      throw new BadRequestException('Player already have a steam linked');
    }
    return this.steamService.openIdUrl(player);
  }

  async unlinkSteamProfile(idPlayer: number): Promise<PlayerEntity> {
    return this.update(idPlayer, { idSteamProfile: undefined });
  }

  async findIdByPersonaName(personaName: string): Promise<number> {
    return this.playerRepository.findOneOrFail({ select: ['id'], where: { personaName } }).then(player => player.id);
  }

  async findIdByIdUser(idUser: number): Promise<number> {
    return this.playerRepository.findOneOrFail({ select: ['id'], where: { idUser } }).then(player => player.id);
  }

  async findRandom(): Promise<PlayerEntity> {
    return this.playerRepository.createQueryBuilder('p').orderBy('rand()').getOneOrFail();
  }
}
