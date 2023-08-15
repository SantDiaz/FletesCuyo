import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Paso2FComponent } from './paso2-f/paso2-f.component';
import { Paso1fComponent } from './paso1f/paso1f.component';
import { Paso3fComponent } from './paso3f/paso3f.component';


@NgModule({
  declarations: [
    Paso1fComponent,
    Paso2FComponent,
    Paso3fComponent,
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
    Paso1fComponent,
    Paso2FComponent,
    Paso3fComponent
  ], 
})
export class FleteModule { }
