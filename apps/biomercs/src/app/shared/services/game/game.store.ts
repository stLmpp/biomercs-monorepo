import { Injectable } from '@angular/core';
import { Game } from '@biomercs/api-interfaces';
import { EntityState, EntityStore } from '@stlmpp/store';

export type GameState = EntityState<Game>;

@Injectable({ providedIn: 'root' })
export class GameStore extends EntityStore<GameState> {
  constructor() {
    super({ name: 'game' });
  }
}
