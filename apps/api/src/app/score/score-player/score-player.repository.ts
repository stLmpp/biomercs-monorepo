import { EntityRepository, Repository } from 'typeorm';
import { ScorePlayerEntity } from './score-player.entity';

@EntityRepository(ScorePlayerEntity)
export class ScorePlayerRepository extends Repository<ScorePlayerEntity> {
  async findCountByIdScoreWithtoutCreator(idScore: number): Promise<number> {
    return this.createQueryBuilder('sp')
      .innerJoin('sp.score', 's')
      .andWhere('sp.idScore = :idScore', { idScore })
      .andWhere('sp.idPlayer != s.createdByIdPlayer')
      .getCount();
  }
}
