import { EntityRepository, Repository } from 'typeorm';
import { ScoreApprovalEntity } from './score-approval.entity';

@EntityRepository(ScoreApprovalEntity)
export class ScoreApprovalRepository extends Repository<ScoreApprovalEntity> {}
