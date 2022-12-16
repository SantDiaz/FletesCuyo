import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MapsModule } from '../maps/maps.module';
import { Maps2Module } from '../maps2/maps2.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PasosModule } from '../fletes/pasos/pasos.module';
import { RegisterModule } from '../register/register.module';
import { ChatModule } from '../chat/chat.module';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HomePageRoutingModule,
    MapsModule,
    Maps2Module,
    PasosModule,
    RegisterModule,
    ChatModule,
    ProfileModule
    
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
