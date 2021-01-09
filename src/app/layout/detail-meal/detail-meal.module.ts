import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailMealPageRoutingModule } from './detail-meal-routing.module';

import { DetailMealPage } from './detail-meal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailMealPageRoutingModule
  ],
  declarations: [DetailMealPage]
})
export class DetailMealPageModule {}
