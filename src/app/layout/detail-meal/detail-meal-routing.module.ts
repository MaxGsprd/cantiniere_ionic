import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailMealPage } from './detail-meal.page';

const routes: Routes = [
  {
    path: '',
    component: DetailMealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailMealPageRoutingModule {}
