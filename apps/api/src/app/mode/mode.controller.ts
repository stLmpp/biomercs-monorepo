import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ModeService } from './mode.service';
import { ModeEntity } from './mode.entity';
import { ModeAddDto, ModeUpdateDto } from './mode.dto';
import { RouteParam } from '@biomercs/api-interfaces';
import { ApiAdmin } from '../auth/api-admin.decorator';
import { ApiAuth } from '../auth/api-auth.decorator';

@ApiAuth()
@ApiTags('Mode')
@Controller('mode')
export class ModeController {
  constructor(private modeService: ModeService) {}

  @ApiAdmin()
  @Post()
  async add(@Body() dto: ModeAddDto): Promise<ModeEntity> {
    return this.modeService.add(dto);
  }

  @ApiAdmin()
  @Patch(`:${RouteParam.idMode}`)
  async update(@Param(RouteParam.idMode) idMode: number, @Body() dto: ModeUpdateDto): Promise<ModeEntity> {
    return this.modeService.update(idMode, dto);
  }

  @Get(`platform/:${RouteParam.idPlatform}/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}`)
  async findByIdPlatformGameMiniGame(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number
  ): Promise<ModeEntity[]> {
    return this.modeService.findByIdPlatformGameMiniGame(idPlatform, idGame, idMiniGame);
  }

  @Get(`:${RouteParam.idMode}`)
  async findById(@Param(RouteParam.idMode) idMode: number): Promise<ModeEntity> {
    return this.modeService.findById(idMode);
  }
}
