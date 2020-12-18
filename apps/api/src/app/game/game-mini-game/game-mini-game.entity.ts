import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { GameEntity } from '../game.entity';
import { BaseEntity } from '../../shared/super/base-entity';
import { MiniGameEntity } from '../../mini-game/mini-game.entity';
import { PlatformGameMiniGameEntity } from '../../platform/platform-game-mini-game/platform-game-mini-game.entity';

@Unique(['idGame', 'idMiniGame'])
@Entity()
export class GameMiniGameEntity extends BaseEntity {
  @Column() idGame!: number;

  @ManyToOne(() => GameEntity)
  @JoinColumn()
  game!: GameEntity;

  @Column() idMiniGame!: number;

  @ManyToOne(() => MiniGameEntity)
  @JoinColumn()
  miniGame!: MiniGameEntity;

  @OneToMany(() => PlatformGameMiniGameEntity, platformGameMiniGame => platformGameMiniGame.gameMiniGame)
  platformGameMiniGames!: PlatformGameMiniGameEntity[];
}
