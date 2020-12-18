import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../auth/api-auth.decorator';
import { ScoreService } from './score.service';
import { ScoreAddDto } from './score.dto';
import { RouteParam } from '@biomercs/api-interfaces';
import { ScoreViewModel } from './view-model/score.view-model';
import { ScoreEntity } from './score.entity';
import { ScoreTableViewModel } from './view-model/score-table.view-model';

@ApiAuth()
@ApiTags('Score')
@Controller('score')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @Post()
  async add(@Body() dto: ScoreAddDto): Promise<ScoreViewModel> {
    return this.scoreService.add(dto);
  }

  @ApiQuery({ name: 'platform', required: false })
  @ApiQuery({ name: 'game', required: false })
  @ApiQuery({ name: 'miniGame', required: false })
  @ApiQuery({ name: 'mode', required: false })
  @Post('insert-random')
  async insertRandom(
    @Query('platform') platform?: string,
    @Query('game') game?: string,
    @Query('miniGame') miniGame?: string,
    @Query('mode') mode?: string
  ): Promise<ScoreEntity> {
    return this.scoreService.insert({ miniGame, platform, mode, game });
  }

  @ApiQuery({ name: 'platform', required: false })
  @ApiQuery({ name: 'game', required: false })
  @ApiQuery({ name: 'miniGame', required: false })
  @ApiQuery({ name: 'mode', required: false })
  @Post('insert-many-random')
  async insertManyRandom(
    @Query('q') q: number,
    @Query('platform') platform?: string,
    @Query('game') game?: string,
    @Query('miniGame') miniGame?: string,
    @Query('mode') mode?: string
  ): Promise<ScoreEntity[]> {
    return Promise.all(
      Array.from({ length: q }).map(() => this.scoreService.insert({ miniGame, platform, mode, game }))
    );
  }

  @Get(
    `platform/:${RouteParam.idPlatform}/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}/mode/:${RouteParam.idMode}/score-table`
  )
  async findScoreTable(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number,
    @Param(RouteParam.idMode) idMode: number
  ): Promise<ScoreTableViewModel[]> {
    return this.scoreService.findScoreTable(idPlatform, idGame, idMiniGame, idMode);
  }

  @Get(`:${RouteParam.idScore}`)
  async findByIdMapped(@Param(RouteParam.idScore) idScore: number): Promise<ScoreViewModel> {
    return this.scoreService.findByIdMapped(idScore);
  }
}
