import { BadRequestException, Controller, Get, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SteamService } from './steam.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SteamProfileEntity } from './steam-profile.entity';
import { ApiAuth } from '../auth/api-auth.decorator';
import { OptionalQueryPipe } from '../shared/pipe/optional-query.pipe';
import { ApiAdmin } from '../auth/api-admin.decorator';
import { environment } from '../environment/environment';
import { RouteParam } from '@biomercs/api-interfaces';

@ApiTags('Steam')
@Controller('steam')
export class SteamController {
  constructor(private steamService: SteamService) {}

  @Get('auth')
  @ApiQuery({ name: RouteParam.idUser, required: false })
  @ApiQuery({ name: RouteParam.idPlayer, required: false })
  async auth(
    @Req() req: Request,
    @Res() res: Response,
    @Query(RouteParam.openidReturnTo) returnUrl: string,
    @Query(RouteParam.idUser, OptionalQueryPipe) idUser?: number,
    @Query(RouteParam.idPlayer, OptionalQueryPipe) idPlayer?: number
  ): Promise<void> {
    if (idUser) {
      await this.steamService.authenticateAndLinkUser(req, idUser, returnUrl);
    } else if (idPlayer) {
      await this.steamService.authenticateAndLinkPlayer(req, idPlayer, returnUrl);
    } else {
      throw new BadRequestException('Needs an idUser or idPlayer to authenticate');
    }
    res.redirect(environment.frontEndUrl);
  }

  @ApiAuth()
  @Put(`:${RouteParam.idSteamProfile}/refresh`)
  async refresh(@Param(RouteParam.idSteamProfile) idSteamProfile: number): Promise<SteamProfileEntity> {
    return this.steamService.updateSteamProfile(idSteamProfile);
  }

  @ApiAdmin()
  @ApiAuth()
  @Post(`create/:${RouteParam.steamid}`)
  async create(@Param(RouteParam.steamid) steamid: string): Promise<SteamProfileEntity> {
    return this.steamService.create(steamid);
  }
}
