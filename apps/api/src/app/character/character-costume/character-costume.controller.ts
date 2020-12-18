import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiAuth } from '../../auth/api-auth.decorator';
import { CharacterCostumeUpdateDto } from './character-costume.dto';
import { CharacterCostumeEntity } from './character-costume.entity';
import { CharacterCostumeService } from './character-costume.service';
import { RouteParam } from '@biomercs/api-interfaces';

@ApiAuth()
@ApiTags('Character costume')
@Controller('character-costume')
export class CharacterCostumeController {
  constructor(private characterCostumeService: CharacterCostumeService) {}

  @Patch(`:${RouteParam.idCharacterCostume}`)
  async update(
    @Param(RouteParam.idCharacterCostume) idCharacterCostume: number,
    @Body() dto: CharacterCostumeUpdateDto
  ): Promise<CharacterCostumeEntity> {
    return this.characterCostumeService.update(idCharacterCostume, dto);
  }
}
