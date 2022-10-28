import { Injectable } from '@angular/core';
import { Map, LngLatLike } from 'mapbox-gl';
import { DirectionApiClient } from '../api/directionApiClient';
import { DirectionsResponse } from '../interface/directions';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;

  constructor(
        private directionsApi: DirectionApiClient,
  ) { }

  get isMapReady(){
    return !!this.map;
  }

  setMap (map: Map){
    this.map = map;
  }

  flyTo( coords: LngLatLike ){
    if( !this.isMapReady) throw Error ('El mapa no esta listo');
    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }



  getRouteBetweenPoints( start : [number, number], end: [number, number]){

    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')} `)
    .subscribe(resp => console.log(resp) );
  }



  // const url = [`fffff`].join('');











}
