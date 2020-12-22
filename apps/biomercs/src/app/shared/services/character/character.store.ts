import { Injectable } from '@angular/core';
import { Character } from '@biomercs/api-interfaces';
import { EntityState, EntityStore } from '@stlmpp/store';

export type CharacterState = EntityState<Character>;

@Injectable({ providedIn: 'root' })
export class CharacterStore extends EntityStore<CharacterState> {
  constructor() {
    super({ name: 'character' });
  }
}
