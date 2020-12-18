import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StageService } from './stage.service';
import { StageEntity } from './stage.entity';
import { StageAddDto, StageUpdateDto } from './stage.dto';
import { RouteParam } from '@biomercs/api-interfaces';
import { ApiAdmin } from '../auth/api-admin.decorator';
import { ApiAuth } from '../auth/api-auth.decorator';

@ApiAuth()
@ApiTags('Stage')
@Controller('stage')
export class StageController {
  constructor(private stageService: StageService) {}

  @ApiAdmin()
  @Post()
  async add(@Body() dto: StageAddDto): Promise<StageEntity> {
    return this.stageService.add(dto);
  }

  @ApiAdmin()
  @Patch(`:${RouteParam.idStage}`)
  async update(@Param(RouteParam.idStage) idStage: number, @Body() dto: StageUpdateDto): Promise<StageEntity> {
    return this.stageService.update(idStage, dto);
  }

  @Get(
    `platform/:${RouteParam.idPlatform}/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}/mode/:${RouteParam.idMode}`
  )
  async findByIdPlatformGameMiniGameMode(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number,
    @Param(RouteParam.idMode) idMode: number
  ): Promise<StageEntity[]> {
    return this.stageService.findByIdPlatformGameMiniGameMode(idPlatform, idGame, idMiniGame, idMode);
  }

  @Get(`:${RouteParam.idStage}`)
  async findById(@Param(RouteParam.idStage) idStage: number): Promise<StageEntity> {
    return this.stageService.findById(idStage);
  }
}
