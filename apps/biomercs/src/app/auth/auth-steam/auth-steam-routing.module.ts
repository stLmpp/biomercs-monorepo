import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SteamRegisterComponent } from './steam-register/steam-register.component';
import { RouteDataEnum } from '../../model/route-data.enum';
import { RouteParam } from '@biomercs/api-interfaces';
import { SteamRegisterGuard } from './steam-register/steam-register.guard';

const routes: Routes = [
  {
    path: `:${RouteParam.steamid}`,
    canActivate: [SteamRegisterGuard],
    children: [
      {
        path: 'register',
        component: SteamRegisterComponent,
      },
      {
        path: 'confirm',
        component: SteamRegisterComponent,
        data: { [RouteDataEnum.confirm]: true },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthSteamRoutingModule {}
