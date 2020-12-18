import { EntityRepository, Repository } from 'typeorm';
import { StageEntity } from './stage.entity';

@EntityRepository(StageEntity)
export class StageRepository extends Repository<StageEntity> {
  async findByIdPlatformGameMiniGameMode(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number
  ): Promise<StageEntity[]> {
    return this.createQueryBuilder('s')
      .innerJoin('s.platformGameMiniGameModeStages', 'pgmms')
      .innerJoin('pgmms.platformGameMiniGameMode', 'pgmm')
      .innerJoin('pgmm.platformGameMiniGame', 'pgm')
      .innerJoin('pgm.gameMiniGame', 'gm')
      .andWhere('pgm.idPlatform = :idPlatform', { idPlatform })
      .andWhere('gm.idGame = :idGame', { idGame })
      .andWhere('gm.idMiniGame = :idMiniGame', { idMiniGame })
      .andWhere('pgmm.idMode = :idMode', { idMode })
      .getMany();
  }
}
