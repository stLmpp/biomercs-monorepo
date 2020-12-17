import { EntityRepository, Repository } from 'typeorm';
import { Mode } from './mode.entity';

@EntityRepository(Mode)
export class ModeRepository extends Repository<Mode> {
  async findByIdPlatformGameMiniGame(idPlatform: number, idGame: number, idMiniGame: number): Promise<Mode[]> {
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
