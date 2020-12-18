import { EntityRepository, Repository } from 'typeorm';
import { GameMiniGameEntity } from './game-mini-game.entity';

@EntityRepository(GameMiniGameEntity)
export class GameMiniGameRepository extends Repository<GameMiniGameEntity> {}
