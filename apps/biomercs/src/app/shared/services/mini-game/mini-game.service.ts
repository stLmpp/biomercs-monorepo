import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, MiniGame } from '@biomercs/api-interfaces';
import { tap } from 'rxjs/operators';
import { MiniGameStore } from './mini-game.store';
import { httpCache } from '../../operators/http-cache';

@Injectable({ providedIn: 'root' })
export class MiniGameService {
  constructor(private http: HttpClient, private miniGameStore: MiniGameStore) {}

  endPoint = 'mini-game';

  findByIdPlatformGame(idPlatform: number, idGame: number): Observable<MiniGame[]> {
    return this.http.get<Game[]>(`${this.endPoint}/platform/${idPlatform}/game/${idGame}`).pipe(
      httpCache(this.miniGameStore, [idPlatform, idGame]),
      tap(miniGames => {
        this.miniGameStore.upsert(miniGames);
      })
    );
  }
}
