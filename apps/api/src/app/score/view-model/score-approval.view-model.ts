import { ScoreApprovalVW } from '@biomercs/api-interfaces';
import { Property } from '../../mapper/mapper.service';
import { PaginationMetaViewModel } from '../../shared/view-model/pagination.view-model';
import { ScoreViewModel } from './score.view-model';

export class ScoreApprovalViewModel implements ScoreApprovalVW {
  @Property() meta!: PaginationMetaViewModel;
  @Property() scores!: ScoreViewModel[];
}
