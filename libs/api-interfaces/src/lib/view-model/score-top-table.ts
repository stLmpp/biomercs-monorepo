import { PaginationMetaVW } from './pagination';
import { ScoreTableVW } from './score-table';
import { Stage } from '../entities';

export interface ScoreTopTableVW {
  stages: Stage[];
  scoreTables: ScoreTableVW[];
  meta: PaginationMetaVW;
}
