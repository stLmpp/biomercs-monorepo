import { NamingStategy } from './naming.strategy';
import { environment } from './environment';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CharacterCostumeEntity } from '../character/character-costume/character-costume.entity';
import { PlayerEntity } from '../player/player.entity';
import { GameMiniGameEntity } from '../game/game-mini-game/game-mini-game.entity';
import { UserEntity } from '../user/user.entity';
import { CharacterEntity } from '../character/character.entity';
import { ScorePlayerEntity } from '../score/score-player/score-player.entity';
import { ModeEntity } from '../mode/mode.entity';
import { AuthConfirmationEntity } from '../auth/auth-confirmation/auth-confirmation.entity';
import { PlatformGameMiniGameModeCharacterCostumeEntity } from '../platform/platform-game-mini-game-mode-character-costume/platform-game-mini-game-mode-character-costume.entity';
import { MiniGameEntity } from '../mini-game/mini-game.entity';
import { ScoreApprovalMotiveEntity } from '../score/score-approval-motive/score-approval-motive.entity';
import { SteamProfileEntity } from '../steam/steam-profile.entity';
import { ScoreEntity } from '../score/score.entity';
import { GameEntity } from '../game/game.entity';
import { PlatformGameMiniGameModeEntity } from '../platform/platform-game-mini-game-mode/platform-game-mini-game-mode.entity';
import { PlatformGameMiniGameEntity } from '../platform/platform-game-mini-game/platform-game-mini-game.entity';
import { PlatformGameMiniGameModeStageEntity } from '../platform/platform-game-mini-game-mode-stage/platform-game-mini-game-mode-stage.entity';
import { RegionEntity } from '../region/region.entity';
import { StageEntity } from '../stage/stage.entity';
import { ScoreApprovalEntity } from '../score/score-approval/score-approval.entity';
import { PlatformEntity } from '../platform/platform.entity';

export const DB_TYPEORM_CONFIG: TypeOrmModuleOptions = {
  ...environment.database,
  type: 'mysql',
  entities: [
    AuthConfirmationEntity,
    CharacterCostumeEntity,
    CharacterEntity,
    GameMiniGameEntity,
    GameEntity,
    MiniGameEntity,
    ModeEntity,
    PlatformGameMiniGameModeCharacterCostumeEntity,
    PlatformGameMiniGameModeStageEntity,
    PlatformGameMiniGameModeEntity,
    PlatformGameMiniGameEntity,
    PlatformEntity,
    PlayerEntity,
    RegionEntity,
    ScoreApprovalMotiveEntity,
    ScoreApprovalEntity,
    ScorePlayerEntity,
    ScoreEntity,
    StageEntity,
    SteamProfileEntity,
    UserEntity,
  ],
  logging: !environment.production ? 'all' : false,
  bigNumberStrings: false,
  namingStrategy: new NamingStategy(),
  dropSchema: false,
};
