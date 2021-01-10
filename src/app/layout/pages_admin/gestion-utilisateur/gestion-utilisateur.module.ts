import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { IonicModule } from '@ionic/angular';
import { GestionUtilisateurPageRoutingModule } from './gestion-utilisateur-routing.module';
import { GestionUtilisateurPage } from './gestion-utilisateur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionUtilisateurPageRoutingModule,
    MatTableModule,
  ],
  declarations: [GestionUtilisateurPage]
})
export class GestionUtilisateurPageModule {}
