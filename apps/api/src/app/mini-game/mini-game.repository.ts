import { EntityRepository, Repository } from 'typeorm';
import { MiniGameEntity } from './mini-game.entity';

@EntityRepository(MiniGameEntity)
export class MiniGameRepository extends Repository<MiniGameEntity> {
  async findByIdPlatformGame(idPlatform: number, idGame: number): Promise<MiniGameEntity[]> {
    return this.createQueryBuilder('m')
      .innerJoin('m.gameMiniGames', 'gm')
      .innerJoin('gm.platformGameMiniGames', 'gmg')
      .andWhere('gmg.idPlatform = :idPlatform', { idPlatform })
      .andWhere('gm.idGame = :idGame', { idGame })
      .getMany();
  }
}
