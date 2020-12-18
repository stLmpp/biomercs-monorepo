import { Injectable } from '@nestjs/common';
import { CharacterRepository } from './character.repository';
import { CharacterEntity } from './character.entity';
import { CharacterAddDto, CharacterUpdateDto } from './character.dto';

@Injectable()
export class CharacterService {
  constructor(private characterRepository: CharacterRepository) {}

  async findById(idCharacter: number): Promise<CharacterEntity> {
    return this.characterRepository.findOneOrFail(idCharacter);
  }

  async add(dto: CharacterAddDto): Promise<CharacterEntity> {
    return this.characterRepository.save(new CharacterEntity().extendDto(dto));
  }

  async update(idCharacter: number, dto: CharacterUpdateDto): Promise<CharacterEntity> {
    await this.characterRepository.update(idCharacter, dto);
    return this.characterRepository.findOneOrFail(idCharacter);
  }

  async findByIdPlatformGameMiniGameMode(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number
  ): Promise<CharacterEntity[]> {
    return this.characterRepository.findByIdPlatformGameMiniGameMode(idPlatform, idGame, idMiniGame, idMode);
  }
}
