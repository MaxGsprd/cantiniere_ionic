import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionMealPage } from './gestion-meal.page';

const routes: Routes = [
  {
    path: '',
    component: GestionMealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionMealPageRoutingModule {}
