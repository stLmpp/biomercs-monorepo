import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteParam } from '@biomercs/api-interfaces';
import { ProfileComponent } from './profile/profile.component';
import { ProfilePersonaNameGuard } from './profile/profile-persona-name.guard';
import { PlayerResolver } from './player.resolver';
import { ProfileIdUserGuard } from './profile/profile-id-user.guard';

const routes: Routes = [
  {
    path: `:${RouteParam.idPlayer}`,
    component: ProfileComponent,
    resolve: [PlayerResolver],
  },
  {
    path: `p/:${RouteParam.personaName}`,
    canActivate: [ProfilePersonaNameGuard],
  },
  {
    path: `u/:${RouteParam.idUser}`,
    canActivate: [ProfileIdUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerRoutingModule {}
