import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ChatComponent } from './chat.component';
import { IonicModule } from '@ionic/angular';
import { HomePageModule } from '../home/home.module';
import { HomePageRoutingModule } from '../home/home-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    // ChatComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    FormsModule
  ],
  exports: [
    // ChatComponent,
  ]
})
export class ChatModule { }
