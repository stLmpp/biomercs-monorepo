import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/super/base-entity';
import { GameMiniGameEntity } from '../game/game-mini-game/game-mini-game.entity';
import { MiniGame } from '@biomercs/api-interfaces';

@Entity()
export class MiniGameEntity extends BaseEntity implements MiniGame {
  @Column() name!: string;

  @OneToMany(() => GameMiniGameEntity, gameMiniGame => gameMiniGame.miniGame)
  gameMiniGames!: GameMiniGameEntity[];
}
