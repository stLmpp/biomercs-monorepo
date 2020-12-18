import { EntityRepository, Repository } from 'typeorm';
import { PlatformGameMiniGameModeCharacterCostumeEntity } from './platform-game-mini-game-mode-character-costume.entity';

@EntityRepository(PlatformGameMiniGameModeCharacterCostumeEntity)
export class PlatformGameMiniGameModeCharacterCostumeRepository extends Repository<PlatformGameMiniGameModeCharacterCostumeEntity> {
  async findIdByPlaformGameMiniGameModeCharacterCostume(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number,
    idCharacterCostume: number
  ): Promise<number> {
    return (
      await this.createQueryBuilder('pgmmcc')
        .innerJoin('pgmmcc.platformGameMiniGameMode', 'pgmm')
        .innerJoin('pgmm.platformGameMiniGame', 'pgm')
        .innerJoin('pgm.gameMiniGame', 'gm')
        .andWhere('pgm.idPlatform = :idPlatform', { idPlatform })
        .andWhere('gm.idGame = :idGame', { idGame })
        .andWhere('gm.idMiniGame = :idMiniGame', { idMiniGame })
        .andWhere('pgmm.idMode = :idMode', { idMode })
        .andWhere('pgmmcc.idCharacterCostume = :idCharacterCostume', { idCharacterCostume })
        .getOneOrFail()
    ).id;
  }
}
