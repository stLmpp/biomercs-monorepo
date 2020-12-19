import { ScorePlayerAdd } from './score-player';

export interface ScoreAdd {
  idPlatform: number;
  idGame: number;
  idMiniGame: number;
  idMode: number;
  idStage: number;
  score: number;
  maxCombo: number;
  time: string;
  dateAchieved?: Date;
  scorePlayers: ScorePlayerAdd[];
}
