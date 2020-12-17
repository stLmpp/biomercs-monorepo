import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../auth/api-auth.decorator';
import { PlayerService } from './player.service';
import { Player } from './player.entity';
import { Params } from '../shared/type/params';
import { PlayerUpdateDto } from './player.dto';

@ApiAuth()
@ApiTags('Player')
@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Put(`:${Params.idPlayer}/link-steam`)
  async linkSteamProfile(@Param(Params.idPlayer) idPlayer: number): Promise<string> {
    return this.playerService.linkSteamProfile(idPlayer);
  }

  @Put(`:${Params.idPlayer}/unlink-steam`)
  async unlinkSteamProfile(@Param(Params.idPlayer) idPlayer: number): Promise<Player> {
    return this.playerService.unlinkSteamProfile(idPlayer);
  }

  @Get(`persona-name/:${Params.personaName}/id`)
  async findIdByPersonaName(@Param(Params.personaName) personaName: string): Promise<number> {
    return this.playerService.findIdByPersonaName(personaName);
  }

  @Get(`user/:${Params.idUser}/id`)
  async findIdByIdUser(@Param(Params.idUser) idUser: number): Promise<number> {
    return this.playerService.findIdByIdUser(idUser);
  }

  @Get(`:${Params.idPlayer}`)
  async findById(@Param(Params.idPlayer) idPlayer: number): Promise<Player> {
    return this.playerService.findById(idPlayer);
  }

  @Patch(`:${Params.idPlayer}`)
  async update(@Param(Params.idPlayer) idPlayer: number, @Body() dto: PlayerUpdateDto): Promise<Player> {
    return this.playerService.update(idPlayer, dto);
  }
}
