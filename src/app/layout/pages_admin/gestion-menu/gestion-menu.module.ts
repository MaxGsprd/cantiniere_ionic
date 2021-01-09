import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionMenuPageRoutingModule } from './gestion-menu-routing.module';

import { GestionMenuPage } from './gestion-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionMenuPageRoutingModule
  ],
  declarations: [GestionMenuPage]
})
export class GestionMenuPageModule {}
