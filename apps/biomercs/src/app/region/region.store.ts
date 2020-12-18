import { Injectable } from '@angular/core';
import { EntityState, EntityStore } from '@stlmpp/store';
import { Region } from '@biomercs/api-interfaces';
import { environment } from '../../environments/environment';

export type RegionState = EntityState<Region>;

@Injectable({ providedIn: 'root' })
export class RegionStore extends EntityStore<RegionState> {
  constructor() {
    super({ name: 'region', cache: environment.cacheTimeout });
  }
}
