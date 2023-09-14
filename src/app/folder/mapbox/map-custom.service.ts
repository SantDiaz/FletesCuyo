import { Injectable, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { map } from 'rxjs/operators'; // Importa el operador map

@Injectable({
  providedIn: 'root'
})
export class MapCustomService {
  private mapboxGeocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  cbAdress: EventEmitter<any> = new EventEmitter<any>(); 
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map 
  wayPoints: Array<any>= [];
  markerDriver: any;
  streetNames: string[] = [];
  styles = 'mapbox://styles/mapbox/streets-v12'
  long = -0.1278; // Longitud de Londres, por ejemplo
  lat =  51.5074; // Latitud de Londres, por ejemplo
  zoom = 3;
  constructor(  private httpClient: HttpClient) {
    this.mapbox.accessToken = environment.apiKey; // Corrección de la asignación del token de acceso

   }

  buildMap(): Promise<any> {
    return new Promise((resolve, reject) => { 
      try {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.styles,
          zoom: this.zoom,
          center: [this.long, this.lat, ]
        });
        //  this.map.addControl(new mapboxgl.NavigationControl() )

        const  geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl,
        })

        geocoder.on('result', ($event) => {
          const {result} = $event;
          geocoder.clear();
          this.cbAdress.emit(result); //captura los emit

        })

        resolve({ // Corrige la sintaxis aquí
          map: this.map,
          geocoder,
          
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  
  
  loadCoords(coords): void {
    console.log('coords -------->', coords);
  
    // Limpia la fuente y la capa existentes si existen
    this.clearRouteSourceAndLayer();
  
    const url = [
      `https://api.mapbox.com/directions/v5/mapbox/driving/`,
      `${coords[0][0]}, ${coords[0][1]}; ${coords[1][0]}, ${coords[1][1]}`,
      `?steps=true&geometries=geojson&access_token=${environment.apiKey}`, 
    ].join('');
  
    console.log('url:', url);
  
    this.httpClient.get(url).subscribe((res: any) => {
      console.log('Response:', res); // Agrega este mensaje de depuración
      const data = res.routes[0];
      const route = data.geometry.coordinates;
      console.log('route:', route);
  
      const sourceConfig: mapboxgl.GeoJSONSourceRaw = {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        }
      };
  
      this.map.addSource('route', sourceConfig);
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round', 
        },
        paint: {
          'line-color': 'red',
          'line-width': 5,
        }
      });
  
      this.wayPoints = route;
      this.map.fitBounds([route[0], route[route.length - 1]], {
        padding: 100
      });
    });
  }
  




addMarkerCustom(coords): void {
  console.log('coords:', coords);
  const el = document.createElement('div');
  el.className = 'marker';
  this.markerDriver = new mapboxgl.Marker(el);
  this.markerDriver
    .setLngLat(coords)
    .addTo(this.map);
}



clearRouteSourceAndLayer(): void {
  if (this.map.getSource('route')) {
    this.map.removeSource('route');
  }
  if (this.map.getLayer('route')) {
    this.map.removeLayer('route');
  }
}





getStreetName(coordinates: mapboxgl.LngLat): Observable<string> {
  // Construye la URL de geocodificación de Mapbox con las coordenadas
  const url = `${this.mapboxGeocodingUrl}/${coordinates.lng},${coordinates.lat}.json?access_token=${environment.apiKey}`;

  // Realiza una solicitud HTTP GET a la API de geocodificación de Mapbox
  return this.httpClient.get(url).pipe(
    map((response: any) => {
      // Extrae el nombre de la calle del resultado de geocodificación
      if (response.features && response.features.length > 0) {
        const streetName = response.features[0].text;
        return streetName;
      }
      return 'Nombre de la calle no encontrado';
    })
  );
}

addStreetName(name: string) {
  this.streetNames.push(name);
}

}
