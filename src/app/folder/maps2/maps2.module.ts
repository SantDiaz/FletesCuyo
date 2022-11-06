import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Screen2Component } from './screen2/screen2.component';
import { FletesPageRoutingModule } from '../fletes/fletes-routing.module';
import { RouterModule } from '@angular/router';
import { BtnMiubicComponent } from './components/btn-miubic/btn-miubic.component';
import { BtnDesdeComponent } from './components/btn-desde/btn-desde.component';
import { BtnHastaComponent } from './components/btn-hasta/btn-hasta.component';



@NgModule({
  declarations: [
    Screen2Component,
    BtnMiubicComponent,
    BtnDesdeComponent,
    BtnHastaComponent,
  ],
  imports: [
    CommonModule,
    FletesPageRoutingModule,
    RouterModule,
  ],
  exports: [
    Screen2Component,
    BtnMiubicComponent,
    BtnDesdeComponent,
    BtnHastaComponent,
  ]
})
export class Maps2Module { }
