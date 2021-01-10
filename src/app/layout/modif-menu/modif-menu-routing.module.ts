import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifMenuPage } from './modif-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ModifMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifMenuPageRoutingModule {}
