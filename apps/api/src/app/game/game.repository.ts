import { EntityRepository, Repository } from 'typeorm';
import { GameEntity } from './game.entity';

@EntityRepository(GameEntity)
export class GameRepository extends Repository<GameEntity> {
  async findByIdPlatform(idPlatform: number): Promise<GameEntity[]> {
    return this.createQueryBuilder('g')
      .innerJoin('g.gameMiniGames', 'gm')
      .innerJoin('gm.platformGameMiniGames', 'gmg')
      .andWhere('gmg.idPlatform = :idPlatform', { idPlatform })
      .getMany();
  }
}
