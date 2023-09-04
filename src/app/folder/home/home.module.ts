import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PasosModule } from '../fletes/pasos/pasos.module';
import { ChatModule } from '../chat/chat.module';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HomePageRoutingModule,
    PasosModule,
    ChatModule,
    ProfileModule
    
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
