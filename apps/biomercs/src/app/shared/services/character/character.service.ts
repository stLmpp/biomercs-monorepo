import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '@biomercs/api-interfaces';
import { tap } from 'rxjs/operators';
import { CharacterStore } from './character.store';
import { httpCache } from '../../operators/http-cache';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  constructor(private http: HttpClient, private characterStore: CharacterStore) {}

  endPoint = 'character';

  findByIdPlatformGameMiniGameMode(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number
  ): Observable<Character[]> {
    return this.http
      .get<Character[]>(`${this.endPoint}/platform/${idPlatform}/game/${idGame}/mini-game/${idMiniGame}/mode/${idMode}`)
      .pipe(
        httpCache(this.characterStore, [idPlatform, idGame, idMiniGame, idMode]),
        tap(characters => {
          this.characterStore.upsert(characters);
        })
      );
  }
}
