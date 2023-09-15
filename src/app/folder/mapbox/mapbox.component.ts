import { Component, ElementRef, OnInit, Renderer2, ViewChild, Input } from '@angular/core';
import { MapCustomService } from '../mapbox/map-custom.service';
import * as mapboxgl from 'mapbox-gl';
import { GeolocateControl } from 'mapbox-gl';
import { Paso2Component } from '../fletes/pasos/paso2/paso2.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  @ViewChild('asGeocoder') asGeocoder: ElementRef;
  @Input() paso2ComponentRef: Paso2Component; // Recibe la referencia al componente Paso2Component
  map: mapboxgl.Map;
  modeInput = 'start';
  startMarker: mapboxgl.Marker | null = null;
  endMarker: mapboxgl.Marker | null = null;
  draggingMarker: mapboxgl.Marker | null = null;

  constructor(private mapCustom: MapCustomService, private renderer2: Renderer2, private modalController: ModalController // Agrega el controlador de modal
  ) {
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
        this.endMarker = this.createMarker(new mapboxgl.LngLat(null, null), 'end');
  
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
          if (this.startMarker && this.endMarker) {
            this.drawRoute();
          }

        });
  
        const closeButton = document.getElementById('cerrarModalButton');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            this.cerrarModal(); // Llama a la función para cerrar el modal
          });
        }


        const startButton = document.querySelector('.green-button');
        const endButton = document.querySelector('.red-button');
        const drawRouteButton = document.querySelector('.btn-route');
        
        if (startButton) {
          startButton.addEventListener('click', () => {
            this.changeModel('start'); // Llama a la función para cambiar el modo
          });
        }
        
        if (endButton) {
          endButton.addEventListener('click', () => {
            this.changeModel('end'); // Llama a la función para cambiar el modo
          });
        }
  
        if (drawRouteButton) {
          drawRouteButton.addEventListener('click', () => {
            this.drawRoute(); // Llama a la función para dibujar la ruta
          });
        }
        
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
    this.enviarDatos();
  }
  

  changeModel(mode: string): void {
    this.modeInput = mode;
    console.log('modeInput:', this.modeInput);
  }










  enviarDatos(): void {
    if (!this.startMarker || !this.endMarker) {
      console.log('Selecciona puntos de inicio y final primero.');
      return;
    }
  
    // Obtener las coordenadas de los marcadores de inicio y fin
    const startCoordinates = this.startMarker.getLngLat();
    const endCoordinates = this.endMarker.getLngLat();
  
    // Almacena las coordenadas en propiedades de Paso2Component
    this.paso2ComponentRef.startCoordinates = {
      latitude: startCoordinates.lat,
      longitude: startCoordinates.lng
    };
  
    this.paso2ComponentRef.endCoordinates = {
      latitude: endCoordinates.lat,
      longitude: endCoordinates.lng
    };
  
    // Utilizar el servicio de geocodificación de Mapbox para obtener el nombre de la calle
    this.mapCustom.getStreetName(startCoordinates).subscribe((startStreetName) => {
      this.mapCustom.getStreetName(endCoordinates).subscribe((endStreetName) => {
        // Aquí tienes los nombres de las calles, puedes hacer lo que necesites con ellos
        console.log('Nombre de la calle de inicio:', startStreetName);
        console.log('Nombre de la calle de fin:', endStreetName);
        this.paso2ComponentRef.confirmarUbicaciones([startStreetName, endStreetName]);
  
        // Llama a receiveCoordinates para pasar las coordenadas a Paso2Component
        const coordinatesData = {
          start: {
            latitude: startCoordinates.lat,
            longitude: startCoordinates.lng,
          },
          end: {
            latitude: endCoordinates.lat,
            longitude: endCoordinates.lng,
          },
        };
        this.paso2ComponentRef.receiveCoordinates(coordinatesData);
      });
    });
  }
  

  cerrarModal(){
    this.modalController.dismiss();

  }

sendCoordinatesToPaso2(): void {
  if (!this.startMarker || !this.endMarker) {
    console.log('Selecciona puntos de inicio y final primero.');
    return;
  }

  // Obtener las coordenadas de los marcadores de inicio y fin
  const startCoordinates = this.startMarker.getLngLat();
  const endCoordinates = this.endMarker.getLngLat();

  // Convierte las coordenadas a un formato adecuado para su envío al componente Paso2Component
  const coordinatesData = {
    start: {
      latitude: startCoordinates.lat,
      longitude: startCoordinates.lng,
    },
    end: {
      latitude: endCoordinates.lat,
      longitude: endCoordinates.lng,
    },
  };

  // Llama al método del componente Paso2Component para pasar las coordenadas
  this.paso2ComponentRef.receiveCoordinates(coordinatesData);

  // Cierra el modal
  this.modalController.dismiss();
}




//fletero
mostrarRuta(startCoordinates: { latitude: number, longitude: number }, endCoordinates: { latitude: number, longitude: number }) {
  
  // Código para mostrar la ruta en el mapa utilizando Mapbox GL JS
  const mapboxAccessToken = 'TU_ACCESS_TOKEN'; // Reemplaza con tu token de Mapbox

  // Configura el mapa
  this.map = new mapboxgl.Map({
    container: 'map', // ID del contenedor HTML donde se mostrará el mapa
    style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa (puedes personalizarlo)
    center: [startCoordinates.longitude, startCoordinates.latitude], // Coordenadas iniciales del mapa
    zoom: 10, // Nivel de zoom inicial
  });

  // Agrega marcadores para el inicio y el fin
  new mapboxgl.Marker().setLngLat([startCoordinates.longitude, startCoordinates.latitude]).addTo(this.map);
  new mapboxgl.Marker().setLngLat([endCoordinates.longitude, endCoordinates.latitude]).addTo(this.map);

 this.drawRoute();
}

}
