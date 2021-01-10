import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewIngredientPageRoutingModule } from './new-ingredient-routing.module';

import { NewIngredientPage } from './new-ingredient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewIngredientPageRoutingModule
  ],
  declarations: [NewIngredientPage]
})
export class NewIngredientPageModule {}
