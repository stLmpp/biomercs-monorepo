import { Injectable } from '@nestjs/common';
import { CharacterCostumeRepository } from './character-costume.repository';
import { CharacterCostumeAddDto, CharacterCostumeUpdateDto } from './character-costume.dto';
import { CharacterCostumeEntity } from './character-costume.entity';

@Injectable()
export class CharacterCostumeService {
  constructor(private characterCostumeRepository: CharacterCostumeRepository) {}

  async add(idCharacter: number, dto: CharacterCostumeAddDto): Promise<CharacterCostumeEntity> {
    return this.characterCostumeRepository.save(new CharacterCostumeEntity().extendDto({ idCharacter, ...dto }));
  }

  async update(idCharacterCostume: number, dto: CharacterCostumeUpdateDto): Promise<CharacterCostumeEntity> {
    const characterCostume = await this.characterCostumeRepository.findOneOrFail(idCharacterCostume);
    await this.characterCostumeRepository.update(idCharacterCostume, dto);
    return new CharacterCostumeEntity().extendDto({ ...characterCostume, ...dto });
  }
}
