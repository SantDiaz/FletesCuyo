import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import {Map, Popup, Marker} from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement?: ElementRef

  constructor(
    private placesServices: PlacesService,
    private mapService: MapService,
    
    ) { }

  
  ngAfterViewInit():void{

    if(!this.placesServices.useLocation) throw Error('No hay placeservice.useLocation');

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
    
      new  Marker({ color: 'red' })
    .setLngLat( this.placesServices.useLocation)
    .setPopup( popup )
    .addTo( map )

    this.mapService.setMap(map);
  }

  



}
