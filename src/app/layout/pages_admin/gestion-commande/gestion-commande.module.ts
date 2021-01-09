import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { IonicModule } from '@ionic/angular';

import { GestionCommandePageRoutingModule } from './gestion-commande-routing.module';

import { GestionCommandePage } from './gestion-commande.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionCommandePageRoutingModule,
    MatTableModule
  ],
  declarations: [GestionCommandePage]
})
export class GestionCommandePageModule {}
