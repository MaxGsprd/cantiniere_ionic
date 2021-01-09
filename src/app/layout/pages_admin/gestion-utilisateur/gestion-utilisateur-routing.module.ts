import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionUtilisateurPage } from './gestion-utilisateur.page';

const routes: Routes = [
  {
    path: '',
    component: GestionUtilisateurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionUtilisateurPageRoutingModule {}
