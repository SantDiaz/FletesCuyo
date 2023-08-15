import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { Paso1UComponent } from './paso1-u/paso1-u.component';
import { Paso2UComponent } from './paso2-u/paso2-u.component';
import { Paso3UComponent } from './paso3-u/paso3-u.component';
import { Paso4UComponent } from './paso4-u/paso4-u.component';



@NgModule({
  declarations: [
    Paso1UComponent,
    Paso2UComponent,
    Paso3UComponent,
    Paso4UComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ComponentsModule,    
    FormsModule
        // MapsModule,

  ],
  exports:[ 
    Paso1UComponent,
    Paso2UComponent,
    Paso3UComponent,
    Paso4UComponent
  ], 
})
export class UserModule { }
