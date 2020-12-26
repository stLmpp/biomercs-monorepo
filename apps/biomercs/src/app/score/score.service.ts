import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScoreTopTableVW, ScoreVW } from '@biomercs/api-interfaces';
import { ScoreAdd } from '@biomercs/api-dto';
import { HttpParams } from '../util/http-params';

@Injectable({ providedIn: 'root' })
export class ScoreService {
  constructor(private http: HttpClient) {}

  endPoint = 'score';

  post(dto: ScoreAdd): Observable<ScoreVW> {
    return this.http.post<ScoreVW>(this.endPoint, dto);
  }

  findById(idScore: number): Observable<ScoreVW> {
    return this.http.get<ScoreVW>(`${this.endPoint}/${idScore}`);
  }

  findTopScoresTable(
    idPlatform: number,
    idGame: number,
    idMiniGame: number,
    idMode: number,
    page: number,
    limit?: number
  ): Observable<ScoreTopTableVW> {
    const params = new HttpParams({ page, limit }, true);
    return this.http.get<ScoreTopTableVW>(
      `${this.endPoint}/platform/${idPlatform}/game/${idGame}/mini-game/${idMiniGame}/mode/${idMode}/score-table`,
      { params }
    );
  }
}
