import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MapCustomService } from '../mapbox/map-custom.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  @ViewChild('asGeocoder') asGeocoder: ElementRef;
  startPoint: mapboxgl.LngLat | null = null; // Coordenadas del punto inicial
  endPoint: mapboxgl.LngLat | null = null;   // Coordenadas del punto final
  map: mapboxgl.Map;
  modeInput = 'start';
  startMarker: mapboxgl.Marker | null = null;
  endMarker: mapboxgl.Marker | null = null;

  constructor(private mapCustom: MapCustomService, private renderer2: Renderer2) {
    this.modeInput = 'start';
  }

  ngOnInit(): void {
    this.mapCustom.buildMap()
      .then(({ map, geocoder }) => {
        this.map = map;
        this.renderer2.appendChild(this.asGeocoder.nativeElement, geocoder.onAdd(map));
        console.log('Carga', map);

        // Inicializar los marcadores en posiciones vacías
        this.startMarker = this.createMarker(new mapboxgl.LngLat(0, 0), 'start');
        this.endMarker = this.createMarker(new mapboxgl.LngLat(0, 0), 'end');

        // Agregar clic en el mapa para actualizar los marcadores
        this.map.on('click', (event) => {
          const coordinates = event.lngLat;
          if (this.modeInput === 'start') {
            this.updateMarkerPosition(this.startMarker, coordinates);
          } else if (this.modeInput === 'end') {
            this.updateMarkerPosition(this.endMarker, coordinates);
          }
        });
      })
      .catch((error) => {
        console.log('no Carga', error);
      });

    this.mapCustom.cbAdress.subscribe((getPoint) => {
      console.log('*** get point', getPoint);
      if (this.modeInput === 'start') {
        this.updateMarkerPosition(this.startMarker, new mapboxgl.LngLat(getPoint.center[0], getPoint.center[1]));
      }
      if (this.modeInput === 'end') {
        this.updateMarkerPosition(this.endMarker, new mapboxgl.LngLat(getPoint.center[0], getPoint.center[1]));
      }
    });
  }

  createMarker(coordinates: mapboxgl.LngLat, label: string): mapboxgl.Marker {
    let marker;
    if (label === 'end') {
      // Crea un marcador con un icono personalizado para el punto final (marcador rojo)
      marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(coordinates);
    } else {
      // Crea un marcador normal para el punto de inicio
      marker = new mapboxgl.Marker()
        .setLngLat(coordinates);
    }
    marker.addTo(this.map);
    return marker;
  }

  updateMarkerPosition(marker: mapboxgl.Marker, coordinates: mapboxgl.LngLat): void {
    marker.setLngLat(coordinates);
    // Actualiza las coordenadas de inicio y fin según el marcador que se esté moviendo
    if (marker === this.startMarker) {
      this.startPoint = coordinates;
    } else if (marker === this.endMarker) {
      this.endPoint = coordinates;
    }
  }

  drawRoute(): void {
    if (!this.startPoint || !this.endPoint) {
      console.log('Selecciona puntos de inicio y final primero.');
      return;
    }

    const coords = [this.startPoint.toArray(), this.endPoint.toArray()];
    this.mapCustom.loadCoords(coords);
  }

  changeModel(mode: string): void {
    this.modeInput = mode;
    console.log('modeInput:', this.modeInput);
  }
}
