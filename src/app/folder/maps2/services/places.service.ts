import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interface/places';
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  

  public coord?: [number, number ];
  public useLocation?: [number, number ];
  public isLoadingPlaces? : boolean = false;
  
  get isUserLocationReady(): boolean{
      return !!this.useLocation;
  } 
  
  
  constructor(  ) {
    // this.obtenerUbic();
    // this.getUserLocation();
   }



  obtenerUbic(){
        navigator.geolocation.getCurrentPosition(
          ({coords}) => {
            this.coord =[ coords.longitude, coords.latitude];
            console.log('holaa', this.coord);
            return(this.coord);
          })
  }

  // getUserLocation(): Promise<[ number, number]>{
  //   return new Promise ((resolve, reject) =>{
      
  //     navigator.geolocation.getCurrentPosition(
  //         ({coords}) => {
  //           this.useLocation =[ coords.longitude, coords.latitude];
  //           resolve(this.useLocation);
  //         } ,
          
  //           (err) => {
  //             alert('No se pudo obtener su geolocalizacion');
  //             console.log(err);
  //             reject();
  //         }
  //     );
  //   });
  // }




}
