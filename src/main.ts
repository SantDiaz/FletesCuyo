import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1Ijoic2FudGlkaWF6b2siLCJhIjoiY2w5cnNzbGhzMGpiYjN1bGZrNWJyN3hhZyJ9.XLdX5WJVeqUj9JKsFCNW2A';

if ( !navigator.geolocation){
  alert('El navegador no soporta la geolocalizacion');
  throw new Error ('Navegador no soporta ');
}

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
