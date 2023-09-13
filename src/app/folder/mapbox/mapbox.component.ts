import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MapCustomService } from '../mapbox/map-custom.service';
import * as mapboxgl from 'mapbox-gl';
import { GeolocateControl } from 'mapbox-gl';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  @ViewChild('asGeocoder') asGeocoder: ElementRef;
  map: mapboxgl.Map;
  modeInput = 'start';
  startMarker: mapboxgl.Marker | null = null;
  endMarker: mapboxgl.Marker | null = null;
  draggingMarker: mapboxgl.Marker | null = null;

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
  
        // Habilitar el arrastre de marcadores
        this.startMarker.on('dragstart', () => {
          this.draggingMarker = this.startMarker;
        });
  
        this.endMarker.on('dragstart', () => {
          this.draggingMarker = this.endMarker;
        });
  
        // Actualizar la posición del marcador en movimiento durante el arrastre
        this.map.on('mousemove', (event) => {
          if (this.draggingMarker) {
            const coordinates = event.lngLat;
            this.updateMarkerPosition(this.draggingMarker, coordinates);
          }
        });
  
        // Dejar de arrastrar cuando se suelta el botón del mouse
        this.map.on('mouseup', () => {
          this.draggingMarker = null;
        });
  
        // Centrar el mapa en la ubicación del usuario
        this.centerToUserLocation();
      })
      .catch((error) => {
        console.log('no Carga', error);
      });
  }
  



  centerToUserLocation(): void {
    if ('geolocation' in navigator) {
      // Utiliza el API de geolocalización del navegador para obtener la ubicación del usuario
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation: [number, number] = [position.coords.longitude, position.coords.latitude];
  
        // Centra el mapa en la ubicación del usuario
        this.map.flyTo({
          center: userLocation, // Ahora TypeScript sabe que es un arreglo válido
          zoom: 14, // Puedes ajustar el nivel de zoom según tus preferencias
        });
      }, (error) => {
        console.error('Error al obtener la ubicación del usuario', error);
        // Aquí puedes manejar errores si ocurren al obtener la ubicación del usuario
      });
    } else {
      console.error('Geolocalización no soportada en este navegador');
      // Aquí puedes manejar el caso en el que la geolocalización no esté disponible en el navegador
    }
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
    console.log('Updating marker position:', coordinates); // Agrega este mensaje de depuración
    marker.setLngLat(coordinates).addTo(this.map);
  
    // Habilitar el arrastre del marcador
    marker.setDraggable(true);
  }
  

  drawRoute(): void {
    if (!this.startMarker || !this.endMarker) {
      console.log('Selecciona puntos de inicio y final primero.');
      return;
    }
  
    const startCoordinates = this.startMarker.getLngLat();
    const endCoordinates = this.endMarker.getLngLat();
    
    const coords = [startCoordinates.toArray(), endCoordinates.toArray()];
    this.mapCustom.loadCoords(coords);
  }
  

  changeModel(mode: string): void {
    this.modeInput = mode;
    console.log('modeInput:', this.modeInput);
  }
}
