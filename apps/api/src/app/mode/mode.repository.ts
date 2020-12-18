import { EntityRepository, Repository } from 'typeorm';
import { ModeEntity } from './mode.entity';

@EntityRepository(ModeEntity)
export class ModeRepository extends Repository<ModeEntity> {
  async findByIdPlatformGameMiniGame(idPlatform: number, idGame: number, idMiniGame: number): Promise<ModeEntity[]> {
    return this.createQueryBuilder('m')
      .innerJoin('m.platformGameMiniGameModes', 'pgmm')
      .innerJoin('pgmm.platformGameMiniGame', 'pgm')
      .innerJoin('pgm.gameMiniGame', 'gm')
      .andWhere('pgm.idPlatform = :idPlatform', { idPlatform })
      .andWhere('gm.idGame = :idGame', { idGame })
      .andWhere('gm.idMiniGame = :idMiniGame', { idMiniGame })
      .getMany();
  }
}
