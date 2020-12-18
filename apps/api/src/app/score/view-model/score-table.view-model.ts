import { Property } from '../../mapper/mapper.service';
import { ScoreViewModel } from './score.view-model';
import { ScoreTableVW } from '@biomercs/api-interfaces';

export class ScoreTableViewModel implements ScoreTableVW {
  @Property() idPlayer!: number;
  @Property() personaName!: string;
  @Property() total!: number;
  @Property() scores!: (ScoreViewModel | undefined)[];
}
