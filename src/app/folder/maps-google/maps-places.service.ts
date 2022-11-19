import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { promise } from 'protractor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapsPlacesService {

  apiKey = environment.apiKey;
  mapsLoad = false; 

  constructor() { }

  init(renderer: any, document: any):Promise<any>{

    return new Promise((resolve) =>{

        if(this.mapsLoad){
          console.log('maps carganndo');
          resolve(true);
          return;
        }

        const script = renderer.createElement('script');
        script.id = 'googleMaps'

        // window['mapInit'] = () =>{
        //     this.mapsLoad = true;
        //     if (google){
        //       console.log('si cargo');
        //     } else {
        //       console.log('no cargo')
        //     }
        //     resolve(true);
        //     return
        //   }

          if(this.apiKey){
            script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey}
          else {
            script.src = 'https://maps.googleapis.com/maps/api/js?callback='
          }
          
    });

  }
}
