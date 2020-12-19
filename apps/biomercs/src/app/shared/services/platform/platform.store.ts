import { Injectable } from '@angular/core';
import { Platform } from '@biomercs/api-interfaces';
import { EntityState, EntityStore } from '@stlmpp/store';
import { environment } from '../../../../environments/environment';

export type PlatformState = EntityState<Platform>;

@Injectable({ providedIn: 'root' })
export class PlatformStore extends EntityStore<PlatformState> {
  constructor() {
    super({ name: 'platform', cache: environment.cacheTimeout });
  }
}
