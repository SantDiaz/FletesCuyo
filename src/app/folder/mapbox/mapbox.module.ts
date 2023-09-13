import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapboxComponent } from './mapbox.component';
import { MapCustomService } from './map-custom.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [MapboxComponent],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [MapCustomService],
  exports: [
    MapboxComponent
  ]
})
export class MapboxModule { }
