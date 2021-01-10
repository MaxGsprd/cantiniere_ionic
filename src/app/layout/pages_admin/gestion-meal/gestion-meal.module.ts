import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionMealPageRoutingModule } from './gestion-meal-routing.module';

import { MatExpansionModule } from '@angular/material/expansion';

import { GestionMealPage } from './gestion-meal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionMealPageRoutingModule,
    MatExpansionModule

  ],
  declarations: [GestionMealPage]
})
export class GestionMealPageModule {}
