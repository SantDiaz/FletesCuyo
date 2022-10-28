import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { RouterModule } from '@angular/router';
import { FletesPageRoutingModule } from '../fletes/fletes-routing.module';



@NgModule({
  declarations: [
    MapScreenComponent,
    LoadingComponent,
    MapViewComponent,

  ],
  imports: [
    CommonModule,
    FletesPageRoutingModule,
    RouterModule,
    
  ],
  exports: [
    MapScreenComponent,
    LoadingComponent,
    MapViewComponent,
  ]
})
export class MapsModule { }
