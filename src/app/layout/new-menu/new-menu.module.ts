import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { IonicModule } from '@ionic/angular';

import { NewMenuPageRoutingModule } from './new-menu-routing.module';


import { NewMenuPage } from './new-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewMenuPageRoutingModule,
    MatButtonModule
  ],
  declarations: [NewMenuPage]
})
export class NewMenuPageModule {}
