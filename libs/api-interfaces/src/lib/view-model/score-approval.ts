import { PaginationMetaVW } from './pagination';
import { ScoreVW } from './score';

export interface ScoreApprovalVW {
  meta: PaginationMetaVW;
  scores: ScoreVW[];
}
