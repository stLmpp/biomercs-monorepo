import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/super/base-entity';
import { PlatformGameMiniGameModeStageEntity } from '../platform/platform-game-mini-game-mode-stage/platform-game-mini-game-mode-stage.entity';
import { ScorePlayerEntity } from './score-player/score-player.entity';
import { ScoreStatusEnum } from '@biomercs/api-interfaces';

@Entity()
export class ScoreEntity extends BaseEntity {
  @Column()
  idPlatformGameMiniGameModeStage!: number;

  @ManyToOne(() => PlatformGameMiniGameModeStageEntity)
  @JoinColumn()
  platformGameMiniGameModeStage!: PlatformGameMiniGameModeStageEntity;

  @Column()
  score!: number;

  @Column()
  maxCombo!: number;

  @Column({ length: 8 })
  time!: string;

  @Column({ nullable: true })
  dateAchieved?: Date;

  @Column({ type: 'enum', enum: ScoreStatusEnum })
  status!: ScoreStatusEnum;

  @OneToMany(() => ScorePlayerEntity, scorePlayer => scorePlayer.score)
  scorePlayers!: ScorePlayerEntity[];
}
