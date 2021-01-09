import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionUtilisateurPageRoutingModule } from './gestion-utilisateur-routing.module';

import { GestionUtilisateurPage } from './gestion-utilisateur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionUtilisateurPageRoutingModule
  ],
  declarations: [GestionUtilisateurPage]
})
export class GestionUtilisateurPageModule {}
