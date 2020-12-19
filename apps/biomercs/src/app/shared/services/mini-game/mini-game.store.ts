import { Injectable } from '@angular/core';
import { MiniGame } from '@biomercs/api-interfaces';
import { EntityState, EntityStore } from '@stlmpp/store';

export type MiniGameState = EntityState<MiniGame>;

@Injectable({ providedIn: 'root' })
export class MiniGameStore extends EntityStore<MiniGameState> {
  constructor() {
    super({ name: 'mini-game' });
  }
}
