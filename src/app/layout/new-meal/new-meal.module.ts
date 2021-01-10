import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMealPageRoutingModule } from './new-meal-routing.module';

import { NewMealPage } from './new-meal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewMealPageRoutingModule
  ],
  declarations: [NewMealPage]
})
export class NewMealPageModule {}
