import { Component, ElementRef, ViewChild} from '@angular/core';
import { MapService, PlacesService } from '../../services';
import {Map, Popup, Marker} from 'mapbox-gl';

@Component({
  selector: 'app-btn-desde',
  templateUrl: './btn-desde.component.html',
  styleUrls: ['./btn-desde.component.scss'],
})
export class BtnDesdeComponent {

  @ViewChild('mapDiv')
  mapDivElement?: ElementRef
  constructor(
    private placesServices: PlacesService,
    private mapService: MapService,
  ) { }


  desde(){
    
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.placesServices.useLocation,
      zoom: 14, // starting zoom
      // projection: 'globe' 
      });
   const popup = new Popup()
   .setHTML(`
   <h6>Aqui Estoy</h6>
   <spam>Estoy en:</spam>
   `);
  
   new  Marker({ color: 'red', draggable: true, })
  .setLngLat( this.placesServices.useLocation)
  .setPopup( popup )
  .addTo( map )
 }


}
