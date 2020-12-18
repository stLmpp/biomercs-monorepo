import { ScoreVW } from './score';

export interface ScoreTableVW {
  idPlayer: number;
  personaName: string;
  total: number;
  scores: (ScoreVW | undefined)[];
}
