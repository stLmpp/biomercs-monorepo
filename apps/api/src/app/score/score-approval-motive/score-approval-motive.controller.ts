import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../../auth/api-auth.decorator';
import { ScoreApprovalMotiveService } from './score-approval-motive.service';
import { ScoreApprovalMotiveEntity } from './score-approval-motive.entity';
import { ScoreApprovalMotiveAddDto, ScoreApprovalMotiveUpdateDto } from './score-approval-motive.dto';
import { RouteParam } from '@biomercs/api-interfaces';
import { ScoreApprovalActionEnum } from '../score-approval/score-approval-action.enum';
import { ApiAdmin } from '../../auth/api-admin.decorator';

@ApiAuth()
@ApiTags('Score approval motive')
@Controller('score-approval-motive')
export class ScoreApprovalMotiveController {
  constructor(private scoreApprovalMotiveService: ScoreApprovalMotiveService) {}

  @ApiAdmin()
  @Post()
  async add(@Body() dto: ScoreApprovalMotiveAddDto): Promise<ScoreApprovalMotiveEntity> {
    return this.scoreApprovalMotiveService.add(dto);
  }

  @ApiAdmin()
  @Patch(`:${RouteParam.idScoreApprovalMotive}`)
  async update(
    @Param(RouteParam.idScoreApprovalMotive) idScoreApprovalMotive: number,
    @Body() dto: ScoreApprovalMotiveUpdateDto
  ): Promise<ScoreApprovalMotiveEntity> {
    return this.scoreApprovalMotiveService.update(idScoreApprovalMotive, dto);
  }

  @Get('action')
  async findByAction(@Query(RouteParam.action) action: ScoreApprovalActionEnum): Promise<ScoreApprovalMotiveEntity[]> {
    return this.scoreApprovalMotiveService.findByAction(action);
  }
}
