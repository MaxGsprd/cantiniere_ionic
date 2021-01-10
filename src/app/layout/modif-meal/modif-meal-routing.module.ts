import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifMealPage } from './modif-meal.page';

const routes: Routes = [
  {
    path: '',
    component: ModifMealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifMealPageRoutingModule {}
