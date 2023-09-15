import { Component, ElementRef, AfterViewInit, Renderer2, ViewChild, Input } from '@angular/core';
import { MapCustomService } from '../../mapbox/map-custom.service';
import * as mapboxgl from 'mapbox-gl';
import { ModalController } from '@ionic/angular';
import { CardComponent } from '../../fletes/fletes-dis/card/card.component';

@Component({
  selector: 'app-ver-ruta',
  templateUrl: './ver-ruta.component.html',
  styleUrls: ['./ver-ruta.component.scss'],
})
export class VerRutaComponent implements AfterViewInit {

  @ViewChild('map') mapContainer: ElementRef;
  @ViewChild('asGeocoder') asGeocoder: ElementRef;
  @Input() cardComponentRef: CardComponent; // Recibe la referencia al componente Paso2Component
  @Input() datos: any; // Recibe las coordenadas como entrada

  map: mapboxgl.Map;
  modeInput = 'start';
  startMarker: mapboxgl.Marker | null = null;
  endMarker: mapboxgl.Marker | null = null;
  draggingMarker: mapboxgl.Marker | null = null;

  constructor(private mapCustom: MapCustomService, private renderer2: Renderer2, private modalController: ModalController) {
    this.modeInput = 'start';
  }

  
  ngAfterViewInit(): void {
    this.mapCustom.buildMap()
      .then(({ map, geocoder }) => {
        this.map = map;
        this.renderer2.appendChild(this.asGeocoder.nativeElement, geocoder.onAdd(map));
  
        // Escucha el evento de carga del estilo
        this.map.on('style.load', () => {
          console.log('Estilo cargado');
  
          if (this.datos && this.datos.startCoordinates && this.datos.endCoordinates) {
            const startCoordinates = new mapboxgl.LngLat(
              this.datos.startCoordinates.longitude,
              this.datos.startCoordinates.latitude
            );
  
            const endCoordinates = new mapboxgl.LngLat(
              this.datos.endCoordinates.longitude,
              this.datos.endCoordinates.latitude
            );
  
            // Ahora puedes usar startCoordinates y endCoordinates para dibujar la ruta
            this.mapCustom.drawRoute(startCoordinates, endCoordinates);
  
            // Crea marcadores para el punto de inicio y el punto final
            this.startMarker = new mapboxgl.Marker({ color: 'blue' })
              .setLngLat(startCoordinates)
              .addTo(this.map);
  
            this.endMarker = new mapboxgl.Marker({ color: 'red' })
              .setLngLat(endCoordinates)
              .addTo(this.map);
          }
  
          // Agrega un botón personalizado al mapa
          const closeButton = document.getElementById('cerrarModalButton');
          closeButton.addEventListener('click', () => {
            // Lógica para cerrar el modal aquí
            this.cerrarModal();
          });
  
          // Centrar el mapa en la ubicación del usuario
        });
  
        // Centrar el mapa en la ubicación del usuario
      })
      .catch((error) => {
        console.log('no Carga', error);
      });
  }
  
  

  changeModel(mode: string): void {
    this.modeInput = mode;
    console.log('modeInput:', this.modeInput);
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  // Resto del código...
}
