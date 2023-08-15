import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken = 'pk.eyJ1Ijoic2FudGlkaWF6b2siLCJhIjoiY2w5cnNzbGhzMGpiYjN1bGZrNWJyN3hhZyJ9.XLdX5WJVeqUj9JKsFCNW2A';

if (!navigator.geolocation) {
  alert('El navegador no soporta la geolocalizacion');
  throw new Error('Navegador no soporta ');
}

if (environment.production) {
  enableProdMode(); // Habilita el modo de producción
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
