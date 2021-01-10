import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewIngredientPage } from './new-ingredient.page';

const routes: Routes = [
  {
    path: '',
    component: NewIngredientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewIngredientPageRoutingModule {}
