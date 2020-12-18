import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/super/base-entity';
import { GameMiniGameEntity } from './game-mini-game/game-mini-game.entity';
import { Game } from '@biomercs/api-interfaces';

@Entity()
export class GameEntity extends BaseEntity implements Game {
  @Column() name!: string;
  @Column({ length: 10 }) shortName!: string;

  @OneToMany(() => GameMiniGameEntity, gameMiniGame => gameMiniGame.game)
  gameMiniGames!: GameMiniGameEntity[];
}
