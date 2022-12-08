import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLogComponent } from './home-log.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from '../home/home-routing.module';
import { RegisterModule } from '../register/register.module';



@NgModule({
  declarations: [
    HomeLogComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    HomePageRoutingModule,
    RegisterModule,
  ],
  exports: [
    HomeLogComponent,
  ]
})
export class HomeLogModule { }
