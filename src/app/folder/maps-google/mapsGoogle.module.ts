import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MapsGoogleComponent } from './maps-google.component';



@NgModule({
  declarations: [
    MapsGoogleComponent,

  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MapsGoogleComponent,
  ]
})
export class MapsGoogleModule { }
