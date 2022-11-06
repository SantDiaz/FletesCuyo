import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MapsModule } from '../maps/maps.module';
import { Maps2Module } from '../maps2/maps2.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MapsModule,
    Maps2Module,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
