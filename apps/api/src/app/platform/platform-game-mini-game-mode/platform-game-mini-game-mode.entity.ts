import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../shared/super/base-entity';
import { PlatformGameMiniGameEntity } from '../platform-game-mini-game/platform-game-mini-game.entity';
import { ModeEntity } from '../../mode/mode.entity';

@Unique(['idPlatformGameMiniGame', 'idMode'])
@Entity()
export class PlatformGameMiniGameModeEntity extends BaseEntity {
  @Column()
  idPlatformGameMiniGame!: number;

  @ManyToOne(() => PlatformGameMiniGameEntity)
  @JoinColumn()
  platformGameMiniGame!: PlatformGameMiniGameEntity;

  @Column()
  idMode!: number;

  @ManyToOne(() => ModeEntity)
  @JoinColumn()
  mode!: ModeEntity;
}
