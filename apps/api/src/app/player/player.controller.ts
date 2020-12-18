import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../auth/api-auth.decorator';
import { PlayerService } from './player.service';
import { PlayerEntity } from './player.entity';
import { RouteParam } from '@biomercs/api-interfaces';
import { PlayerUpdateDto } from './player.dto';

@ApiAuth()
@ApiTags('Player')
@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Put(`:${RouteParam.idPlayer}/link-steam`)
  async linkSteamProfile(@Param(RouteParam.idPlayer) idPlayer: number): Promise<string> {
    return this.playerService.linkSteamProfile(idPlayer);
  }

  @Put(`:${RouteParam.idPlayer}/unlink-steam`)
  async unlinkSteamProfile(@Param(RouteParam.idPlayer) idPlayer: number): Promise<PlayerEntity> {
    return this.playerService.unlinkSteamProfile(idPlayer);
  }

  @Get(`persona-name/:${RouteParam.personaName}/id`)
  async findIdByPersonaName(@Param(RouteParam.personaName) personaName: string): Promise<number> {
    return this.playerService.findIdByPersonaName(personaName);
  }

  @Get(`user/:${RouteParam.idUser}/id`)
  async findIdByIdUser(@Param(RouteParam.idUser) idUser: number): Promise<number> {
    return this.playerService.findIdByIdUser(idUser);
  }

  @Get(`:${RouteParam.idPlayer}`)
  async findById(@Param(RouteParam.idPlayer) idPlayer: number): Promise<PlayerEntity> {
    return this.playerService.findById(idPlayer);
  }

  @Patch(`:${RouteParam.idPlayer}`)
  async update(@Param(RouteParam.idPlayer) idPlayer: number, @Body() dto: PlayerUpdateDto): Promise<PlayerEntity> {
    return this.playerService.update(idPlayer, dto);
  }
}
