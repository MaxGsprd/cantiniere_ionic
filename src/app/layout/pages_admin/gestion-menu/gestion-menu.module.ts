import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionMenuPageRoutingModule } from './gestion-menu-routing.module';

import { MatExpansionModule } from '@angular/material/expansion';

import { GestionMenuPage } from './gestion-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionMenuPageRoutingModule,
    MatExpansionModule,
  ],
  declarations: [GestionMenuPage]
})
export class GestionMenuPageModule {}
