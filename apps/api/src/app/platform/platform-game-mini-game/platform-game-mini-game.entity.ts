import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../shared/super/base-entity';
import { PlatformEntity } from '../platform.entity';
import { GameMiniGameEntity } from '../../game/game-mini-game/game-mini-game.entity';

@Unique(['idPlatform', 'idGameMiniGame'])
@Entity()
export class PlatformGameMiniGameEntity extends BaseEntity {
  @Column() idPlatform!: number;

  @ManyToOne(() => PlatformEntity)
  @JoinColumn()
  platform!: PlatformEntity;

  @Column() idGameMiniGame!: number;

  @ManyToOne(() => GameMiniGameEntity)
  @JoinColumn()
  gameMiniGame!: GameMiniGameEntity;
}
