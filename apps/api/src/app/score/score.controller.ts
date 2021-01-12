import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../auth/api-auth.decorator';
import { ScoreService } from './score.service';
import { ScoreAddDto } from './score.dto';
import { RouteParam, User } from '@biomercs/api-interfaces';
import { ScoreViewModel } from './view-model/score.view-model';
import { ScoreEntity } from './score.entity';
import { ScoreTopTableViewModel } from './view-model/score-table.view-model';
import { OptionalQueryPipe } from '../shared/pipe/optional-query.pipe';
import { ApiAdmin } from '../auth/api-admin.decorator';
import { ScoreApprovalViewModel } from './view-model/score-approval.view-model';
import { AuthUser } from '../auth/auth-user.decorator';
import { ScoreApprovalAddDto } from './score-approval/score-approval.dto';
import { ScoreApprovalActionEnum } from './score-approval/score-approval-action.enum';

@ApiAuth()
@ApiTags('Score')
@Controller('score')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @Post()
  async add(@Body() dto: ScoreAddDto, @AuthUser() user: User): Promise<ScoreViewModel> {
    return this.scoreService.add(dto, user);
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

  @ApiQuery({ name: RouteParam.limit, required: false })
  @Get(
    `platform/:${RouteParam.idPlatform}/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}/mode/:${RouteParam.idMode}/score-table`
  )
  async findScoreTable(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number,
    @Param(RouteParam.idMode) idMode: number,
    @Query(RouteParam.page) page: number,
    @Query(RouteParam.limit, OptionalQueryPipe) limit?: number
  ): Promise<ScoreTopTableViewModel> {
    return this.scoreService.findScoreTable(idPlatform, idGame, idMiniGame, idMode, page, limit ?? 10);
  }

  @ApiQuery({ name: RouteParam.idPlatform, required: false })
  @ApiQuery({ name: RouteParam.idGame, required: false })
  @ApiQuery({ name: RouteParam.idMiniGame, required: false })
  @ApiQuery({ name: RouteParam.idMode, required: false })
  @ApiQuery({ name: RouteParam.limit, required: false })
  @ApiAdmin()
  @Get(`approval/admin`)
  async findApprovalListAdmin(
    @Query(RouteParam.idPlatform) idPlatform: number,
    @Query(RouteParam.page) page: number,
    @Query(RouteParam.idGame, OptionalQueryPipe) idGame?: number,
    @Query(RouteParam.idMiniGame, OptionalQueryPipe) idMiniGame?: number,
    @Query(RouteParam.idMode, OptionalQueryPipe) idMode?: number,
    @Query(RouteParam.limit, OptionalQueryPipe) limit?: number
  ): Promise<ScoreApprovalViewModel> {
    return this.scoreService.findApprovalListAdmin({
      idMiniGame,
      idMode,
      idPlatform,
      limit: limit ?? 10,
      page,
      idGame,
    });
  }

  @ApiQuery({ name: RouteParam.idPlatform, required: false })
  @ApiQuery({ name: RouteParam.idGame, required: false })
  @ApiQuery({ name: RouteParam.idMiniGame, required: false })
  @ApiQuery({ name: RouteParam.idMode, required: false })
  @ApiQuery({ name: RouteParam.limit, required: false })
  @Get(`approval/player`)
  async findApprovalListPlayer(
    @AuthUser() user: User,
    @Query(RouteParam.idPlatform) idPlatform: number,
    @Query(RouteParam.page) page: number,
    @Query(RouteParam.idGame, OptionalQueryPipe) idGame?: number,
    @Query(RouteParam.idMiniGame, OptionalQueryPipe) idMiniGame?: number,
    @Query(RouteParam.idMode, OptionalQueryPipe) idMode?: number,
    @Query(RouteParam.limit, OptionalQueryPipe) limit?: number
  ): Promise<ScoreApprovalViewModel> {
    return this.scoreService.findApprovalListUser(user, {
      idMiniGame,
      idMode,
      idPlatform,
      limit: limit ?? 10,
      page,
      idGame,
    });
  }

  @ApiAdmin()
  @Post(`:${RouteParam.idScore}/approve/admin`)
  async approveAdmin(
    @Param(RouteParam.idScore) idScore: number,
    @Body() dto: ScoreApprovalAddDto,
    @AuthUser() user: User
  ): Promise<void> {
    return this.scoreService.approvalAdmin(idScore, dto, user, ScoreApprovalActionEnum.Approve);
  }

  @Post(`:${RouteParam.idScore}/approve/player`)
  async approvePlayer(
    @Param(RouteParam.idScore) idScore: number,
    @Body() dto: ScoreApprovalAddDto,
    @AuthUser() user: User
  ): Promise<void> {
    return this.scoreService.approvalPlayer(idScore, dto, user, ScoreApprovalActionEnum.Approve);
  }

  @ApiAdmin()
  @Post(`:${RouteParam.idScore}/reject/admin`)
  async rejectAdmin(
    @Param(RouteParam.idScore) idScore: number,
    @Body() dto: ScoreApprovalAddDto,
    @AuthUser() user: User
  ): Promise<void> {
    return this.scoreService.approvalAdmin(idScore, dto, user, ScoreApprovalActionEnum.Reject);
  }

  @Post(`:${RouteParam.idScore}/reject/player`)
  async rejectPlayer(
    @Param(RouteParam.idScore) idScore: number,
    @Body() dto: ScoreApprovalAddDto,
    @AuthUser() user: User
  ): Promise<void> {
    return this.scoreService.approvalPlayer(idScore, dto, user, ScoreApprovalActionEnum.Reject);
  }

  @Get(`:${RouteParam.idScore}`)
  async findByIdMapped(@Param(RouteParam.idScore) idScore: number): Promise<ScoreViewModel> {
    return this.scoreService.findByIdMapped(idScore);
  }
}
