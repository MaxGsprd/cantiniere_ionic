import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifMealPageRoutingModule } from './modif-meal-routing.module';

import { ModifMealPage } from './modif-meal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModifMealPageRoutingModule
  ],
  declarations: [ModifMealPage]
})
export class ModifMealPageModule {}
