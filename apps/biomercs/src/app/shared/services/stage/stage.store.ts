import { Injectable } from '@angular/core';
import { Stage } from '@biomercs/api-interfaces';
import { EntityState, EntityStore } from '@stlmpp/store';

export type StageState = EntityState<Stage>;

@Injectable({ providedIn: 'root' })
export class StageStore extends EntityStore<StageState> {
  constructor() {
    super({ name: 'stage' });
  }
}
