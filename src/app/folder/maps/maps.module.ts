import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapScreenComponent } from './screens/map-screen/map-screen.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { RouterModule } from '@angular/router';
import { FletesPageRoutingModule } from '../fletes/fletes-routing.module';
import { FletesLogoComponent } from './components/fletes-logo/fletes-logo.component';
import { BtnMyLocationComponent } from './components/btn-my-location/btn-my-location.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BtnDesdeComponent } from './components/btn-desde/btn-desde.component';



@NgModule({
  declarations: [
    MapScreenComponent,
    LoadingComponent,
    MapViewComponent,
    FletesLogoComponent,
    BtnMyLocationComponent,
    SearchResultComponent,
    SearchBarComponent,
    BtnDesdeComponent,

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
    FletesLogoComponent,
    BtnMyLocationComponent,
    SearchResultComponent,
    SearchBarComponent,
    BtnDesdeComponent,
  ]
})
export class MapsModule { }
