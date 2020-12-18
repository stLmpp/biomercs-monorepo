import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Player } from '@biomercs/api-interfaces';
import { PlayerService } from './player.service';
import { RouteParam } from '@biomercs/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayerResolver implements Resolve<Player> {
  constructor(private playerService: PlayerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Player> | Promise<Player> | Player {
    const idPlayer = +route.paramMap.get(RouteParam.idPlayer)!;
    return this.playerService.getById(idPlayer);
  }
}
