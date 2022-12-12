import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
