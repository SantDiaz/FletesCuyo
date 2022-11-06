import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import {Map, Popup, Marker, Marker2} from 'mapbox-gl';

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
      center:  this.placesServices.useLocation,
      zoom: 14, // starting zoom
      // projection: 'globe' 
      })

      const popup = new Popup()
      .setHTML(`
      <h6>Aqui Estoy</h6>
      <spam>Estoy en:</spam>
      `);
      
      
      new  Marker({ color: 'red', draggable: true, })
      .setLngLat( this.placesServices.useLocation)
      .setPopup( popup )
      .addTo( map )
    //   const coord = this.placesServices.useLocation;
      .on("dragend", ()=>{
     console.log(this.placesServices.useLocation);
    })
   
    this.mapService.setMap(map);
  }

  // crearMarcador( lgn: number, lat: number){

  //     const marker = new Mapboxgl.Marker({
  //       draggable: true,
  //     }).setLngLat([lng, lat]).addTo
  // }



}
