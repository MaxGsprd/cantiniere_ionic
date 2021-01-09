import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionCommandePage } from './gestion-commande.page';

const routes: Routes = [
  {
    path: '',
    component: GestionCommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionCommandePageRoutingModule {}
