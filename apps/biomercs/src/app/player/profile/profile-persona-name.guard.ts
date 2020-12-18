import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../player.service';
import { RouteParam } from '@biomercs/api-interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfilePersonaNameGuard implements CanActivate {
  constructor(private playerService: PlayerService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const personaName = route.paramMap.get(RouteParam.personaName)!;
    return this.playerService
      .getIdByPersonaName(personaName)
      .pipe(map(idPlayer => this.router.createUrlTree(['/player', idPlayer])));
  }
}
