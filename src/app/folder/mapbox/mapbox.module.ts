import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapboxComponent } from './mapbox.component';
import { MapCustomService } from './map-custom.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VerRutaComponent } from './ver-ruta/ver-ruta.component';


@NgModule({
  declarations: [MapboxComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    VerRutaComponent,
  ],
  providers: [MapCustomService],
  exports: [
    MapboxComponent,
    VerRutaComponent
  ]
})
export class MapboxModule { }
