import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/super/base-entity';
import { ScoreEntity } from '../score.entity';
import { PlayerEntity } from '../../player/player.entity';
import { PlatformGameMiniGameModeCharacterCostumeEntity } from '../../platform/platform-game-mini-game-mode-character-costume/platform-game-mini-game-mode-character-costume.entity';

@Entity()
export class ScorePlayerEntity extends BaseEntity {
  @Column()
  idScore!: number;

  @ManyToOne(() => ScoreEntity)
  @JoinColumn()
  score!: ScoreEntity;

  @Column()
  idPlayer!: number;

  @ManyToOne(() => PlayerEntity)
  @JoinColumn()
  player!: PlayerEntity;

  @Column()
  idPlatformGameMiniGameModeCharacterCostume!: number;

  @ManyToOne(() => PlatformGameMiniGameModeCharacterCostumeEntity)
  @JoinColumn()
  platformGameMiniGameModeCharacterCostume!: PlatformGameMiniGameModeCharacterCostumeEntity;

  @Column({ default: false })
  host!: boolean;

  @Column({ nullable: true })
  bulletKills!: number;

  @Column({ nullable: true, length: 1000 })
  description?: string;

  @Column({ length: 1000 })
  evidence!: string;
}
