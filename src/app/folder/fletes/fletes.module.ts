import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FletesPageRoutingModule } from './fletes-routing.module';

import { FletesPage } from './fletes.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PasosModule } from './pasos/pasos.module';
import { MapsModule } from '../maps/maps.module';
// import { LoginRegModule } from 'src/app/login-Reg/login-reg.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FletesPageRoutingModule,
    ComponentsModule,
    PasosModule,
    MapsModule,
    // LoginRegModule
  ],
  declarations: [FletesPage]
})
export class FletesPageModule {}
