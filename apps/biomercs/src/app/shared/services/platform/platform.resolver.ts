import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Platform } from '@biomercs/api-interfaces';
import { PlatformService } from './platform.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlatformResolver implements Resolve<Platform[]> {
  constructor(private platformService: PlatformService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Platform[]> | Promise<Platform[]> | Platform[] {
    return this.platformService.findAll();
  }
}
