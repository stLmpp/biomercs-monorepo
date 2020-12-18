import { EntityRepository, Repository } from 'typeorm';
import { ScoreApprovalMotiveEntity } from './score-approval-motive.entity';

@EntityRepository(ScoreApprovalMotiveEntity)
export class ScoreApprovalMotiveRepository extends Repository<ScoreApprovalMotiveEntity> {}
