import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paso1Component } from './paso1/paso1.component';
import { Paso2Component } from './paso2/paso2.component';
import { RouterModule } from '@angular/router';
import { Paso3Component } from './paso3/paso3.component';
import { FletesPageRoutingModule } from '../fletes-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';




@NgModule({
  declarations: [
    Paso1Component,
    Paso2Component,
    Paso3Component,
  ],
  imports: [
    CommonModule,
    FletesPageRoutingModule,
    RouterModule,
    ComponentsModule,

  ],
  exports:[
    Paso1Component,
    Paso2Component,
    Paso3Component,
  ], 
})
export class PasosModule { }
