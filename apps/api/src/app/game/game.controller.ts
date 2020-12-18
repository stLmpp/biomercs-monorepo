import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { GameEntity } from './game.entity';
import { GameAddDto, GameUpdateDto } from './game.dto';
import { RouteParam } from '@biomercs/api-interfaces';
import { ApiAdmin } from '../auth/api-admin.decorator';
import { ApiAuth } from '../auth/api-auth.decorator';
import { GameMiniGameEntity } from './game-mini-game/game-mini-game.entity';
import { GameMiniGameService } from './game-mini-game/game-mini-game.service';

@ApiAuth()
@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private gameService: GameService, private gameMiniGameService: GameMiniGameService) {}

  @ApiAdmin()
  @Post()
  async add(@Body() dto: GameAddDto): Promise<GameEntity> {
    return this.gameService.add(dto);
  }

  @ApiAdmin()
  @Patch(`:${RouteParam.idGame}`)
  async update(@Param(RouteParam.idGame) idGame: number, @Body() dto: GameUpdateDto): Promise<GameEntity> {
    return this.gameService.update(idGame, dto);
  }

  @ApiAdmin()
  @Put(`:${RouteParam.idGame}/link/mini-game/:${RouteParam.idMiniGame}`)
  async linkGameMiniGame(
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number
  ): Promise<GameMiniGameEntity> {
    return this.gameMiniGameService.link(idGame, idMiniGame);
  }

  @ApiAdmin()
  @Delete(`:${RouteParam.idGame}/unlink/mini-game/:${RouteParam.idMiniGame}`)
  async unlinkGameMiniGame(
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number
  ): Promise<void> {
    await this.gameMiniGameService.unlink(idGame, idMiniGame);
  }

  @Get(`platform/:${RouteParam.idPlatform}`)
  async findByIdPlatform(@Param(RouteParam.idPlatform) idPlatform: number): Promise<GameEntity[]> {
    return this.gameService.findByIdPlatform(idPlatform);
  }

  @Get(`:${RouteParam.idGame}`)
  async findById(@Param(RouteParam.idGame) idGame: number): Promise<GameEntity> {
    return this.gameService.findById(idGame);
  }
}
