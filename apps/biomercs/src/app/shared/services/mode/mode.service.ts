import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mode } from '@biomercs/api-interfaces';
import { tap } from 'rxjs/operators';
import { ModeStore } from './mode.store';
import { httpCache } from '../../operators/http-cache';

@Injectable({ providedIn: 'root' })
export class ModeService {
  constructor(private http: HttpClient, private modeStore: ModeStore) {}

  endPoint = 'mode';

  findByIdPlatformGameMiniGame(idPlatform: number, idGame: number, idMiniGame: number): Observable<Mode[]> {
    return this.http.get<Mode[]>(`${this.endPoint}/platform/${idPlatform}/game/${idGame}/mini-game/${idMiniGame}`).pipe(
      httpCache(this.modeStore, [idPlatform, idGame, idMiniGame]),
      tap(modes => {
        this.modeStore.upsert(modes);
      })
    );
  }
}
