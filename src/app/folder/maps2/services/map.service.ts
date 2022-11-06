import { Injectable } from '@angular/core';
import { Map, LngLatLike } from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Feature } from '../../maps/interface/places';
// import { DirectionApiClient } from '../api/directionApiClient';
import { DirectionsResponse } from '../interface/direction';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public useLocation?: [number, number ];
  private map?: Map;
  public places: Feature[]=[];

  constructor(

  ) { 
    this.getUserLocation();
  }




  getUserLocation(): Promise<[ number, number]>{
    return new Promise ((resolve, reject) =>{
      
      navigator.geolocation.getCurrentPosition(
          ({coords}) => {
            this.useLocation =[ coords.longitude, coords.latitude];
            resolve(this.useLocation);
          } ,
          
            (err) => {
              alert('No se pudo obtener su geolocalizacion');
              console.log(err);
              reject();
          }
      );
    });
  }



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

  flyDesde(useLocation){
    if( !this.isMapReady) throw Error ('El mapa no esta listo');
    this.map?.flyTo({
      zoom: 14,
      center: useLocation
    })
  }



  // getRouteBetweenPoints( start : [number, number], end: [number, number]){

  //   this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')} `)
  //   .subscribe(resp => console.log(resp) );
  // }
   }