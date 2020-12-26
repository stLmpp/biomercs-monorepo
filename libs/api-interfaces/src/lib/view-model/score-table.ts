import { ScoreVW } from './score';

export interface ScoreTableVW {
  idPlayer: number;
  personaName: string;
  total: number;
  position: number;
  scores: (ScoreVW | undefined)[];
}
