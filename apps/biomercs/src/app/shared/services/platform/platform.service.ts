import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '@biomercs/api-interfaces';
import { tap } from 'rxjs/operators';
import { PlatformStore } from './platform.store';
import { useCache } from '@stlmpp/store';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  constructor(private http: HttpClient, private platformStore: PlatformStore) {}

  endPoint = 'platform';

  findAll(): Observable<Platform[]> {
    return this.http.get<Platform[]>(this.endPoint).pipe(
      useCache(this.platformStore),
      tap(platforms => {
        this.platformStore.setEntities(platforms);
      })
    );
  }
}
