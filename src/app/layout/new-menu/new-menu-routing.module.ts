import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewMenuPage } from './new-menu.page';

const routes: Routes = [
  {
    path: '',
    component: NewMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMenuPageRoutingModule {}
