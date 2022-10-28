import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { placesApiClient } from '../api/placesApiClient';
import { Feature, PlacesResponse } from '../interface/places';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {


  public useLocation?: [number, number ];
  public isLoadingPlaces? : boolean = false;
  public places: Feature[]=[];
  
  get isUserLocationReady(): boolean{
      return !!this.useLocation;
  } 
  
  
  constructor( private placesApi: placesApiClient ) {

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


  getPlacesByQuery (query: string = ''){

    if ( !this.useLocation ) throw Error ('No  hay useLocation');

    this.isLoadingPlaces=true;
    this.placesApi.get<PlacesResponse>('/${query}.json', {
      params: {
        proximity: this.useLocation.join(','),

      }
    })
    .subscribe(resp =>{
        this.isLoadingPlaces=false;
        this.places = resp.features;
    });
  }

}
