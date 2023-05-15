import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
// import { Paso1FComponent } from './paso1-f/paso1-f.component';
import { Paso2FComponent } from './paso2-f/paso2-f.component';
import { Paso1fComponent } from './paso1f/paso1f.component';



@NgModule({
  declarations: [
    Paso1fComponent,
    Paso2FComponent,

  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,    
    RouterModule,
    FormsModule
        // MapsModule,

  ],
  exports:[
    Paso1fComponent,
    Paso2FComponent,
  ], 
})
export class FleteModule { }
