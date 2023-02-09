import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paso1Component } from './paso1/paso1.component';
import { Paso2Component } from './paso2/paso2.component';
import { RouterModule } from '@angular/router';
import { Paso3Component } from './paso3/paso3.component';
import { FletesPageRoutingModule } from '../fletes-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { FletesDisComponent } from '../fletes-dis/fletes-dis.component';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../fletes-dis/card/card.component';
// import { MapsModule } from '../../maps/maps.module';




@NgModule({
  declarations: [
    Paso1Component,
    Paso2Component,
    Paso3Component,
    FletesDisComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    FletesPageRoutingModule,
    RouterModule,
    ComponentsModule,    
    FormsModule,
    // MapsModule,

  ],
  exports:[
    Paso1Component,
    Paso2Component,
    Paso3Component,
    FletesDisComponent,
    CardComponent,
  ], 
})
export class PasosModule { }
