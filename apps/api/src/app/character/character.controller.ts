import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CharacterService } from './character.service';
import { CharacterEntity } from './character.entity';
import { CharacterAddDto, CharacterUpdateDto } from './character.dto';
import { RouteParam } from '@biomercs/api-interfaces';
import { ApiAdmin } from '../auth/api-admin.decorator';
import { ApiAuth } from '../auth/api-auth.decorator';
import { CharacterCostumeEntity } from './character-costume/character-costume.entity';
import { CharacterCostumeAddDto } from './character-costume/character-costume.dto';
import { CharacterCostumeService } from './character-costume/character-costume.service';

@ApiAuth()
@ApiTags('Character')
@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService, private characterCostumeService: CharacterCostumeService) {}

  @ApiAdmin()
  @Post()
  async add(@Body() dto: CharacterAddDto): Promise<CharacterEntity> {
    return this.characterService.add(dto);
  }

  @ApiAdmin()
  @Patch(`:${RouteParam.idCharacter}`)
  async update(
    @Param(RouteParam.idCharacter) idCharacter: number,
    @Body() dto: CharacterUpdateDto
  ): Promise<CharacterEntity> {
    return this.characterService.update(idCharacter, dto);
  }

  @ApiAdmin()
  @Post(`:${RouteParam.idCharacter}/costume`)
  async addCostume(
    @Param(RouteParam.idCharacter) idCharacter: number,
    @Body() dto: CharacterCostumeAddDto
  ): Promise<CharacterCostumeEntity> {
    return this.characterCostumeService.add(idCharacter, dto);
  }

  @Get(
    `platform/:${RouteParam.idPlatform}/game/:${RouteParam.idGame}/mini-game/:${RouteParam.idMiniGame}/mode/:${RouteParam.idMode}`
  )
  async findByIdPlatformGameMiniGameMode(
    @Param(RouteParam.idPlatform) idPlatform: number,
    @Param(RouteParam.idGame) idGame: number,
    @Param(RouteParam.idMiniGame) idMiniGame: number,
    @Param(RouteParam.idMode) idMode: number
  ): Promise<CharacterEntity[]> {
    return this.characterService.findByIdPlatformGameMiniGameMode(idPlatform, idGame, idMiniGame, idMode);
  }

  @Get(`:${RouteParam.idCharacter}`)
  async findById(@Param(RouteParam.idCharacter) idCharacter: number): Promise<CharacterEntity> {
    return this.characterService.findById(idCharacter);
  }
}
