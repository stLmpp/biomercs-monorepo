import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MiniGameService } from './mini-game.service';
import { MiniGameEntity } from './mini-game.entity';
import { MiniGameAddDto, MiniGameUpdateDto } from './mini-game.dto';
import { RouteParam } from '@biomercs/api-interfaces';
import { ApiAdmin } from '../auth/api-admin.decorator';
import { ApiAuth } from '../auth/api-auth.decorator';

@ApiAuth()
@ApiTags('Mini game')
@Controller('mini-game')
export class MiniGameController {
  constructor(private miniGameService: MiniGameService) {}

  @ApiAdmin()
  @Post()
  async add(@Body() dto: MiniGameAddDto): Promise<MiniGameEntity> {
    return this.miniGameService.add(dto);
  }

  @ApiAdmin()
  @Patch(`:${RouteParam.idMiniGame}`)
  async update(
    @Param(RouteParam.idMiniGame) idMiniGame: number,
    @Body() dto: MiniGameUpdateDto
  ): Promise<MiniGameEntity> {
    return this.miniGameService.update(idMiniGame, dto);
  }

  @Get(`platform/:${RouteParam.idPlatform}/game/:${RouteParam.idGame}`)
  async findByIdPlatformGame(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number
  ): Promise<MiniGameEntity[]> {
    return this.miniGameService.findByIdPlatformGame(idPlatform, idGame);
  }

  @Get(`:${RouteParam.idMiniGame}`)
  async findById(@Param(RouteParam.idMiniGame) idMiniGame: number): Promise<MiniGameEntity> {
    return this.miniGameService.findById(idMiniGame);
  }
}
