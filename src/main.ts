import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if ( !navigator.geolocation){
  alert('El navegador no soporta la geolocalizacion');
  throw new Error ('Navegador no soporta ');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
