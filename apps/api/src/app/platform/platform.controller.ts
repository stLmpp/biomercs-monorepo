import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlatformService } from './platform.service';
import { Platform } from './platform.entity';
import { PlatformAddDto, PlatformUpdateDto } from './platform.dto';
import { Params } from '../shared/type/params';
import { ApiAdmin } from '../auth/api-admin.decorator';
import { ApiAuth } from '../auth/api-auth.decorator';
import { PlatformGameMiniGameService } from './platform-game-mini-game/platform-game-mini-game.service';
import { PlatformGameMiniGame } from './platform-game-mini-game/platform-game-mini-game.entity';
import { PlatformGameMiniGameModeService } from './platform-game-mini-game-mode/platform-game-mini-game-mode.service';
import { PlatformGameMiniGameMode } from './platform-game-mini-game-mode/platform-game-mini-game-mode.entity';
import { PlatformGameMiniGameModeStageService } from './platform-game-mini-game-mode-stage/platform-game-mini-game-mode-stage.service';
import { PlatformGameMiniGameModeCharacterCostumeService } from './platform-game-mini-game-mode-character-costume/platform-game-mini-game-mode-character-costume.service';
import { PlatformGameMiniGameModeCharacterCostume } from './platform-game-mini-game-mode-character-costume/platform-game-mini-game-mode-character-costume.entity';
import { PlatformGameMiniGameModeStage } from './platform-game-mini-game-mode-stage/platform-game-mini-game-mode-stage.entity';

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
  async add(@Body() dto: PlatformAddDto): Promise<Platform> {
    return this.platformService.add(dto);
  }

  @ApiAdmin()
  @Patch(`:${Params.idPlatform}`)
  async update(@Param(Params.idPlatform) idPlatform: number, @Body() dto: PlatformUpdateDto): Promise<Platform> {
    return this.platformService.update(idPlatform, dto);
  }

  @ApiAdmin()
  @Put(`:${Params.idPlatform}/link/game/:${Params.idGame}/mini-game/:${Params.idMiniGame}`)
  async linkGameMiniGame(
    @Param(Params.idPlatform) idPlatform: number,
    @Param(Params.idGame) idGame: number,
    @Param(Params.idMiniGame) idMiniGame: number
  ): Promise<PlatformGameMiniGame> {
    return this.platformGameMiniGameService.link(idPlatform, idGame, idMiniGame);
  }

  @ApiAdmin()
  @Delete(`:${Params.idPlatform}/unlink/game/:${Params.idGame}/mini-game/:${Params.idMiniGame}`)
  async unlinkGameMiniGame(
    @Param(Params.idPlatform) idPlatform: number,
    @Param(Params.idGame) idGame: number,
    @Param(Params.idMiniGame) idMiniGame: number
  ): Promise<void> {
    await this.platformGameMiniGameService.unlink(idPlatform, idGame, idMiniGame);
  }

  @ApiAdmin()
  @Put(`:${Params.idPlatform}/link/game/:${Params.idGame}/mini-game/:${Params.idMiniGame}/mode/:${Params.idMode}`)
  async linkGameMiniGameMode(
    @Param(Params.idPlatform) idPlatform: number,
    @Param(Params.idGame) idGame: number,
    @Param(Params.idMiniGame) idMiniGame: number,
    @Param(Params.idMode) idMode: number
  ): Promise<PlatformGameMiniGameMode> {
    return this.platformGameMiniGameModeService.link(idPlatform, idGame, idMiniGame, idMode);
  }

  @ApiAdmin()
  @Delete(`:${Params.idPlatform}/unlink/game/:${Params.idGame}/mini-game/:${Params.idMiniGame}/mode/:${Params.idMode}`)
  async unlinkGameMiniGameMode(
    @Param(Params.idPlatform) idPlatform: number,
    @Param(Params.idGame) idGame: number,
    @Param(Params.idMiniGame) idMiniGame: number,
    @Param(Params.idMode) idMode: number
  ): Promise<void> {
    await this.platformGameMiniGameModeService.unlink(idPlatform, idGame, idMiniGame, idMode);
  }

  @ApiAdmin()
  @Put(
    `:${Params.idPlatform}/link/game/:${Params.idGame}/mini-game/:${Params.idMiniGame}/mode/:${Params.idMode}/character-costume/:${Params.idCharacterCostume}`
  )
  async linkGameMiniGameModeCharacterCostume(
    @Param(Params.idPlatform) idPlatform: number,
    @Param(Params.idGame) idGame: number,
    @Param(Params.idMiniGame) idMiniGame: number,
    @Param(Params.idMode) idMode: number,
    @Param(Params.idCharacterCostume) idCharacterCostume: number
  ): Promise<PlatformGameMiniGameModeCharacterCostume> {
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
    `:${Params.idPlatform}/unlink/game/:${Params.idGame}/mini-game/:${Params.idMiniGame}/mode/:${Params.idMode}/character-costume/:${Params.idCharacterCostume}`
  )
  async unlinkGameMiniGameModeCharacterCostume(
    @Param(Params.idPlatform) idPlatform: number,
    @Param(Params.idGame) idGame: number,
    @Param(Params.idMiniGame) idMiniGame: number,
    @Param(Params.idMode) idMode: number,
    @Param(Params.idCharacterCostume) idCharacterCostume: number
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
    `:${Params.idPlatform}/link/game/:${Params.idGame}/mini-game/:${Params.idMiniGame}/mode/:${Params.idMode}/state/:${Params.idStage}`
  )
  async linkGameMiniGameModeStage(
    @Param(Params.idPlatform) idPlatform: number,
    @Param(Params.idGame) idGame: number,
    @Param(Params.idMiniGame) idMiniGame: number,
    @Param(Params.idMode) idMode: number,
    @Param(Params.idStage) idStage: number
  ): Promise<PlatformGameMiniGameModeStage> {
    return this.platformGameMiniGameModeStageService.link(idPlatform, idGame, idMiniGame, idMode, idStage);
  }

  @ApiAdmin()
  @Delete(
    `:${Params.idPlatform}/unlink/game/:${Params.idGame}/mini-game/:${Params.idMiniGame}/mode/:${Params.idMode}/state/:${Params.idStage}`
  )
  async unlinkGameMiniGameModeStage(
    @Param(Params.idPlatform) idPlatform: number,
    @Param(Params.idGame) idGame: number,
    @Param(Params.idMiniGame) idMiniGame: number,
    @Param(Params.idMode) idMode: number,
    @Param(Params.idStage) idStage: number
  ): Promise<void> {
    await this.platformGameMiniGameModeStageService.unlink(idPlatform, idGame, idMiniGame, idMode, idStage);
  }

  @Get()
  async findAll(): Promise<Platform[]> {
    return this.platformService.findAll();
  }

  @Get(`:${Params.idPlatform}`)
  async findById(@Param(Params.idPlatform) idPlatform: number): Promise<Platform> {
    return this.platformService.findById(idPlatform);
  }
}
