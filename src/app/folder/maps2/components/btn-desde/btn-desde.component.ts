import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-desde',
  templateUrl: './btn-desde.component.html',
  styleUrls: ['./btn-desde.component.scss'],
})
export class BtnDesdeComponent implements OnInit {

  constructor(
          private mapServices: MapService,
          private placesServices: PlacesService,
  ) { }

  ngOnInit() {

  }

  goDesde(  ){
    if( !this.placesServices.useLocation) throw Error('No exite esta ubicacion del usuario'); 
    // if( !this.mapServices.isMapReady) throw Error('No hay mapa disponiblesasa'); 

      this.mapServices.flyTo(this.placesServices.useLocation!);
  }
  


}
