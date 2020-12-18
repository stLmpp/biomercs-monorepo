import { EntityRepository, Repository } from 'typeorm';
import { ScorePlayerEntity } from './score-player.entity';

@EntityRepository(ScorePlayerEntity)
export class ScorePlayerRepository extends Repository<ScorePlayerEntity> {}
