import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifMenuPageRoutingModule } from './modif-menu-routing.module';

import { ModifMenuPage } from './modif-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModifMenuPageRoutingModule
  ],
  declarations: [ModifMenuPage]
})
export class ModifMenuPageModule {}
