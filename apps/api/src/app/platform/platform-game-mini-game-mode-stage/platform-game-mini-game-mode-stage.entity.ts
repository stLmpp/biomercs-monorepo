import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../shared/super/base-entity';
import { PlatformGameMiniGameMode } from '../platform-game-mini-game-mode/platform-game-mini-game-mode.entity';
import { Stage } from '../../stage/stage.entity';

@Unique(['idPlatformGameMiniGameMode', 'idStage'])
@Entity()
export class PlatformGameMiniGameModeStage extends BaseEntity {
  @Column()
  idPlatformGameMiniGameMode!: number;

  @ManyToOne(() => PlatformGameMiniGameMode)
  @JoinColumn()
  platformGameMiniGameMode!: PlatformGameMiniGameMode;

  @Column()
  idStage!: number;

  @ManyToOne(() => Stage)
  @JoinColumn()
  stage!: Stage;
}
