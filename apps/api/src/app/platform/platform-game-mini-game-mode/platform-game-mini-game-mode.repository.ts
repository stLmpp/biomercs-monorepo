import { EntityRepository, Repository } from 'typeorm';
import { PlatformGameMiniGameModeEntity } from './platform-game-mini-game-mode.entity';

@EntityRepository(PlatformGameMiniGameModeEntity)
export class PlatformGameMiniGameModeRepository extends Repository<PlatformGameMiniGameModeEntity> {
  async findIdByPlaformGameMiniGameMode(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number
  ): Promise<number> {
    return (
      await this.createQueryBuilder('pgmm')
        .innerJoin('pgmm.platformGameMiniGame', 'pgm')
        .innerJoin('pgm.gameMiniGame', 'gm')
        .andWhere('pgm.idPlatform = :idPlatform', { idPlatform })
        .andWhere('gm.idGame = :idGame', { idGame })
        .andWhere('gm.idMiniGame = :idMiniGame', { idMiniGame })
        .andWhere('pgmm.idMode = :idMode', { idMode })
        .getOneOrFail()
    ).id;
  }
}
