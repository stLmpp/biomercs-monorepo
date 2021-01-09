import { ScorePlayerVW } from './score-player';
import { ScoreStatusEnum } from '../enum';

export interface ScoreVW {
  idPlatformGameMiniGameModeStage: number;
  idPlatformGameMiniGameMode: number;
  idPlatformGameMiniGame: number;
  idGameMiniGame: number;
  idPlatform: number;
  platformName: string;
  platformShortName: string;
  idGame: number;
  gameName: string;
  gameShortName: string;
  idMiniGame: number;
  miniGameName: string;
  idScore: number;
  idStage: number;
  stageName: string;
  stageShortName: string;
  idMode: number;
  modeName: string;
  score: number;
  maxCombo: number;
  time: string;
  dateAchieved?: Date;
  status: ScoreStatusEnum;
  scorePlayers: ScorePlayerVW[];
  creationDate: Date;
}
