import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/super/base-entity';
import { PlatformGameMiniGameModeStageEntity } from '../platform/platform-game-mini-game-mode-stage/platform-game-mini-game-mode-stage.entity';
import { Stage } from '@biomercs/api-interfaces';

@Entity()
export class StageEntity extends BaseEntity implements Stage {
  @Column() name!: string;
  @Column({ length: 10 }) shortName!: string;

  @OneToMany(
    () => PlatformGameMiniGameModeStageEntity,
    platformGameMiniGameModeStage => platformGameMiniGameModeStage.stage
  )
  platformGameMiniGameModeStages!: PlatformGameMiniGameModeStageEntity[];
}
