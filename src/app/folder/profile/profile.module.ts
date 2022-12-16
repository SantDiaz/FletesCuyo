import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
