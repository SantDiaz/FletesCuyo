import { Component, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl'
import {Map} from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { PlacesService } from '../../maps2/services/places.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.scss'],
})
export class Screen2Component implements OnInit {

  lng: number;
  lat: number;
  public coord?: [number, number ];
  mapa: Mapboxgl.Map;

  constructor(
      private placesServices:PlacesService,
      private mapServices: MapService,
  ) { }

  ngOnInit() {

    (Mapboxgl as any).acess_token= environment.apiKey;

    this.mapa = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -66.17341161417448, -17.379495205699232] ,
      zoom: '14',
    });

    


    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        this.coord =[ coords.longitude, coords.latitude];
        console.log('holaa', this.coord);
        this.lng = coords.longitude;
        this.lat=coords.altitude;
        return(this.coord);

      })
          
      this.marcadorDesde(-66.17341161417448, -17.379495205699232);
    // this.obtenerUbic();
    this.marcadorHasta(-66.17341161417448, -17.379495205699232);
  }


//   obtenerUbic(){
//     navigator.geolocation.getCurrentPosition(
//       ({coords}) => {
//         this.coord =[ coords.longitude, coords.latitude];
//         console.log('holaa', this.coord);
//         return(this.obtenerUbic);
//       })
// }
  
  marcadorDesde(lng: number, lat: number){
    
    const popup = new Mapboxgl.Popup()
    .setHTML(`
    <h6>Punto de partida</h6>
    `);
    
    const marker = new  Mapboxgl.Marker({
    draggable: true,
    color: 'blue'
   })
    .setLngLat([lng,lat])
    .addTo(this.mapa)
    .setPopup( popup )
    const coord = [lng, lat];
    marker.on("dragend", ()=>{
    console.log(coord);
    }),
    this.mapServices.setMap(Map);
  }

 

  marcadorHasta(lng: number, lat: number){

    const popup = new Mapboxgl.Popup()
    .setHTML(`
    <h6>Punto de llegada</h6>
    `);

   const marker = new  Mapboxgl.Marker({
    draggable: true,
    color: 'red',
   })
   .setLngLat([lng,lat])
   .addTo(this.mapa)
   .setPopup( popup )
   
  //  const coord = [marker.getLngLat()];
   .on("dragend", ()=>{
      console.log[marker.getLngLat()];
   })
   this.mapServices.setMap(Map);
  }

}
