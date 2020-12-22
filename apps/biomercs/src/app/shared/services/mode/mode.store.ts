import { Injectable } from '@angular/core';
import { Mode } from '@biomercs/api-interfaces';
import { EntityState, EntityStore } from '@stlmpp/store';

export type ModeState = EntityState<Mode>;

@Injectable({ providedIn: 'root' })
export class ModeStore extends EntityStore<ModeState> {
  constructor() {
    super({ name: 'mode' });
  }
}
