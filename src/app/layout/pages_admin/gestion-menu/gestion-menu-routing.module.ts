import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionMenuPage } from './gestion-menu.page';

const routes: Routes = [
  {
    path: '',
    component: GestionMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionMenuPageRoutingModule {}
