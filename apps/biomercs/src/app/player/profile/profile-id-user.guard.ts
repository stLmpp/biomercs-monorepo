import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../player.service';
import { RouteParam } from '@biomercs/api-interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileIdUserGuard implements CanActivate {
  constructor(private playerService: PlayerService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idUser = +route.paramMap.get(RouteParam.idUser)!;
    return this.playerService
      .getIdByIdUser(idUser)
      .pipe(map(idPlayer => this.router.createUrlTree(['/player', idPlayer])));
  }
}
