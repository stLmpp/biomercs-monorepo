import { NamingStategy } from './naming.strategy';
import { environment } from './environment';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CharacterCostume } from '../character/character-costume/character-costume.entity';
import { Player } from '../player/player.entity';
import { GameMiniGame } from '../game/game-mini-game/game-mini-game.entity';
import { User } from '../user/user.entity';
import { Character } from '../character/character.entity';
import { ScorePlayer } from '../score/score-player/score-player.entity';
import { Mode } from '../mode/mode.entity';
import { AuthConfirmation } from '../auth/auth-confirmation/auth-confirmation.entity';
import { PlatformGameMiniGameModeCharacterCostume } from '../platform/platform-game-mini-game-mode-character-costume/platform-game-mini-game-mode-character-costume.entity';
import { MiniGame } from '../mini-game/mini-game.entity';
import { ScoreApprovalMotive } from '../score/score-approval-motive/score-approval-motive.entity';
import { SteamProfile } from '../steam/steam-profile.entity';
import { Score } from '../score/score.entity';
import { Game } from '../game/game.entity';
import { PlatformGameMiniGameMode } from '../platform/platform-game-mini-game-mode/platform-game-mini-game-mode.entity';
import { PlatformGameMiniGame } from '../platform/platform-game-mini-game/platform-game-mini-game.entity';
import { PlatformGameMiniGameModeStage } from '../platform/platform-game-mini-game-mode-stage/platform-game-mini-game-mode-stage.entity';
import { Region } from '../region/region.entity';
import { Stage } from '../stage/stage.entity';
import { ScoreApproval } from '../score/score-approval/score-approval.entity';
import { Platform } from '../platform/platform.entity';

export const DB_TYPEORM_CONFIG: TypeOrmModuleOptions = {
  ...environment.database,
  type: 'mysql',
  entities: [
    AuthConfirmation,
    CharacterCostume,
    Character,
    GameMiniGame,
    Game,
    MiniGame,
    Mode,
    PlatformGameMiniGameModeCharacterCostume,
    PlatformGameMiniGameModeStage,
    PlatformGameMiniGameMode,
    PlatformGameMiniGame,
    Platform,
    Player,
    Region,
    ScoreApprovalMotive,
    ScoreApproval,
    ScorePlayer,
    Score,
    Stage,
    SteamProfile,
    User,
  ],
  logging: !environment.production ? 'all' : false,
  bigNumberStrings: false,
  namingStrategy: new NamingStategy(),
  dropSchema: false,
};
