import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlatformService } from './platform.service';
import { PlatformEntity } from './platform.entity';
import { PlatformAddDto, PlatformUpdateDto } from './platform.dto';
import { RouteParam } from '@biomercs/api-interfaces';
import { ApiAdmin } from '../auth/api-admin.decorator';
import { ApiAuth } from '../auth/api-auth.decorator';
import { PlatformGameMiniGameService } from './platform-game-mini-game/platform-game-mini-game.service';
import { PlatformGameMiniGameEntity } from './platform-game-mini-game/platform-game-mini-game.entity';
import { PlatformGameMiniGameModeService } from './platform-game-mini-game-mode/platform-game-mini-game-mode.service';
import { PlatformGameMiniGameModeEntity } from './platform-game-mini-game-mode/platform-game-mini-game-mode.entity';
import { PlatformGameMiniGameModeStageService } from './platform-game-mini-game-mode-stage/platform-game-mini-game-mode-stage.service';
import { PlatformGameMiniGameModeCharacterCostumeService } from './platform-game-mini-game-mode-character-costume/platform-game-mini-game-mode-character-costume.service';
import { PlatformGameMiniGameModeCharacterCostumeEntity } from './platform-game-mini-game-mode-character-costume/platform-game-mini-game-mode-character-costume.entity';
import { PlatformGameMiniGameModeStageEntity } from './platform-game-mini-game-mode-stage/platform-game-mini-game-mode-stage.entity';

@ApiAuth()
@ApiTags('Platform')
@Controller('platform')
export class PlatformController {
  constructor(
    private platformService: PlatformService,
    private platformGameMiniGameService: PlatformGameMiniGameService,
    private platformGameMiniGameModeService: PlatformGameMiniGameModeService,
    private platformGameMiniGameModeCharacterCostumeService: PlatformGameMiniGameModeCharacterCostumeService,
    private platformGameMiniGameModeStageService: PlatformGameMiniGameModeStageService
  ) {}

  @ApiAdmin()
  @Post()
  async add(@Body() dto: PlatformAddDto): Promise<PlatformEntity> {
    return this.platformService.add(dto);
  }

  @ApiAdmin()
  @Patch(`:${RouteParam.idPlatform}`)
  async update(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Body() dto: PlatformUpdateDto
  ): Promise<PlatformEntity> {
    return this.platformService.update(idPlatform, dto);
  }

  @ApiAdmin()
  @Put(`:${RouteParam.idPlatform}/link/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}`)
  async linkGameMiniGame(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number
  ): Promise<PlatformGameMiniGameEntity> {
    return this.platformGameMiniGameService.link(idPlatform, idGame, idMiniGame);
  }

  @ApiAdmin()
  @Delete(`:${RouteParam.idPlatform}/unlink/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}`)
  async unlinkGameMiniGame(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number
  ): Promise<void> {
    await this.platformGameMiniGameService.unlink(idPlatform, idGame, idMiniGame);
  }

  @ApiAdmin()
  @Put(
    `:${RouteParam.idPlatform}/link/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}/mode/:${RouteParam.idMode}`
  )
  async linkGameMiniGameMode(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number,
    @Param(RouteParam.idMode) idMode: number
  ): Promise<PlatformGameMiniGameModeEntity> {
    return this.platformGameMiniGameModeService.link(idPlatform, idGame, idMiniGame, idMode);
  }

  @ApiAdmin()
  @Delete(
    `:${RouteParam.idPlatform}/unlink/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}/mode/:${RouteParam.idMode}`
  )
  async unlinkGameMiniGameMode(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number,
    @Param(RouteParam.idMode) idMode: number
  ): Promise<void> {
    await this.platformGameMiniGameModeService.unlink(idPlatform, idGame, idMiniGame, idMode);
  }

  @ApiAdmin()
  @Put(
    `:${RouteParam.idPlatform}/link/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}/mode/:${RouteParam.idMode}/character-costume/:${RouteParam.idCharacterCostume}`
  )
  async linkGameMiniGameModeCharacterCostume(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number,
    @Param(RouteParam.idMode) idMode: number,
    @Param(RouteParam.idCharacterCostume) idCharacterCostume: number
  ): Promise<PlatformGameMiniGameModeCharacterCostumeEntity> {
    return this.platformGameMiniGameModeCharacterCostumeService.link(
      idPlatform,
      idGame,
      idMiniGame,
      idMode,
      idCharacterCostume
    );
  }

  @ApiAdmin()
  @Delete(
    `:${RouteParam.idPlatform}/unlink/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}/mode/:${RouteParam.idMode}/character-costume/:${RouteParam.idCharacterCostume}`
  )
  async unlinkGameMiniGameModeCharacterCostume(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number,
    @Param(RouteParam.idMode) idMode: number,
    @Param(RouteParam.idCharacterCostume) idCharacterCostume: number
  ): Promise<void> {
    await this.platformGameMiniGameModeCharacterCostumeService.unlink(
      idPlatform,
      idGame,
      idMiniGame,
      idMode,
      idCharacterCostume
    );
  }

  @ApiAdmin()
  @Put(
    `:${RouteParam.idPlatform}/link/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}/mode/:${RouteParam.idMode}/state/:${RouteParam.idStage}`
  )
  async linkGameMiniGameModeStage(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number,
    @Param(RouteParam.idMode) idMode: number,
    @Param(RouteParam.idStage) idStage: number
  ): Promise<PlatformGameMiniGameModeStageEntity> {
    return this.platformGameMiniGameModeStageService.link(idPlatform, idGame, idMiniGame, idMode, idStage);
  }

  @ApiAdmin()
  @Delete(
    `:${RouteParam.idPlatform}/unlink/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}/mode/:${RouteParam.idMode}/state/:${RouteParam.idStage}`
  )
  async unlinkGameMiniGameModeStage(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number,
    @Param(RouteParam.idMode) idMode: number,
    @Param(RouteParam.idStage) idStage: number
  ): Promise<void> {
    await this.platformGameMiniGameModeStageService.unlink(idPlatform, idGame, idMiniGame, idMode, idStage);
  }

  @Get()
  async findAll(): Promise<PlatformEntity[]> {
    return this.platformService.findAll();
  }

  @Get(`:${RouteParam.idPlatform}`)
  async findById(@Param(RouteParam.idPlatform) idPlatform: number): Promise<PlatformEntity> {
    return this.platformService.findById(idPlatform);
  }
}
