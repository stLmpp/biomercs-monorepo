import { Property } from '../../mapper/mapper.service';
import { ScoreViewModel } from './score.view-model';
import { ScoreTableVW, ScoreTopTableVW } from '@biomercs/api-interfaces';
import { StageEntity } from '../../stage/stage.entity';
import { PaginationMetaViewModel } from '../../shared/view-model/pagination.view-model';

export class ScoreTopTableViewModel implements ScoreTopTableVW {
  @Property() stages!: StageEntity[];
  @Property() scoreTables!: ScoreTableViewModel[];
  @Property() meta!: PaginationMetaViewModel;
}

export class ScoreTableViewModel implements ScoreTableVW {
  @Property() idPlayer!: number;
  @Property() personaName!: string;
  @Property() total!: number;
  @Property() position!: number;
  @Property() scores!: (ScoreViewModel | undefined)[];
}
