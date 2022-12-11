import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ChatComponent,
  ]
})
export class ChatModule { }
