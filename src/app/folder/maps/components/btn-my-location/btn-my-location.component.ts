import { Component, } from '@angular/core';
import { throwError } from 'rxjs';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss'],
})
export class BtnMyLocationComponent {

  constructor(
    private placesServices: PlacesService,
    private mapService: MapService,
  ) { }
 

  goToMyLocation(){

    if( !this.placesServices.isUserLocationReady) throw Error('No exite esta ubicacion del usuario'); 
    if( !this.mapService.isMapReady) throw Error('No hay mapa disponible'); 

      this.mapService.flyTo(this.placesServices.useLocation!);
  }
}
