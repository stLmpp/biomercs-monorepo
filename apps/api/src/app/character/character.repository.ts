import { EntityRepository, Repository } from 'typeorm';
import { CharacterEntity } from './character.entity';

@EntityRepository(CharacterEntity)
export class CharacterRepository extends Repository<CharacterEntity> {
  async findByIdPlatformGameMiniGameMode(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number
  ): Promise<CharacterEntity[]> {
    return this.createQueryBuilder('c')
      .innerJoinAndSelect('c.characterCostumes', 'cc')
      .innerJoin('cc.platformGameMiniGameModeCharacterCostumes', 'pgmmcc')
      .innerJoin('pgmmcc.platformGameMiniGameMode', 'pgmm')
      .innerJoin('pgmm.platformGameMiniGame', 'pgm')
      .innerJoin('pgm.gameMiniGame', 'gm')
      .andWhere('pgm.idPlatform = :idPlatform', { idPlatform })
      .andWhere('gm.idGame = :idGame', { idGame })
      .andWhere('gm.idMiniGame = :idMiniGame', { idMiniGame })
      .andWhere('pgmm.idMode = :idMode', { idMode })
      .getMany();
  }
}
