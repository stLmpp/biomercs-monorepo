import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../shared/super/base-entity';
import { PlatformGameMiniGameModeEntity } from '../platform-game-mini-game-mode/platform-game-mini-game-mode.entity';
import { StageEntity } from '../../stage/stage.entity';

@Unique(['idPlatformGameMiniGameMode', 'idStage'])
@Entity()
export class PlatformGameMiniGameModeStageEntity extends BaseEntity {
  @Column()
  idPlatformGameMiniGameMode!: number;

  @ManyToOne(() => PlatformGameMiniGameModeEntity)
  @JoinColumn()
  platformGameMiniGameMode!: PlatformGameMiniGameModeEntity;

  @Column()
  idStage!: number;

  @ManyToOne(() => StageEntity)
  @JoinColumn()
  stage!: StageEntity;
}
