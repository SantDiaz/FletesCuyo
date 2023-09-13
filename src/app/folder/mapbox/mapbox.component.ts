import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MapCustomService } from '../mapbox/map-custom.service';
import * as mapboxgl from 'mapbox-gl';

export class wayPoints {
  start: any;
  end: any;
}

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  @ViewChild('asGeocoder') asGeocoder : ElementRef;
  wayPoints: wayPoints = {start:null, end:null};
  modeInput='start';
  



    constructor(private mapCustom: MapCustomService, private renderer2: Renderer2) {
      this.modeInput = 'start'; // Initialize modeInput here if needed
    }

  ngOnInit(): void {
    this.mapCustom.buildMap() 
      .then(({map, geocoder}) => {
        this.renderer2.appendChild(this.asGeocoder.nativeElement,
            geocoder.onAdd(map)
          )
        console.log('Carga', map);
      })
      .catch((error) => {
        console.log('no Carga', error);

        console.log(error);
      });

      this.mapCustom.cbAdress.subscribe((getPoint) => {
        console.log( '*** get point', getPoint);
        if(this.modeInput === 'start'){
          this.wayPoints.start = getPoint;
        }
        if(this.modeInput === 'end'){
          this.wayPoints.end = getPoint;
        }
      })
  }


  drawRoute(): void {
    const coords = [
      this.wayPoints.start.center,
      this.wayPoints.end.center
    ];
    this.mapCustom.loadCoords(coords);
    console.log('anda por lo meno', this.wayPoints );
  }

  changeModel(mode: string): void {
    this.modeInput = mode;
    console.log('modeInput:', this.modeInput);
  }

  testMarker(): void{
    this.mapCustom.addMarkerCustom( [-31.53642142346183, -68.53742900423595 ])
  }

}
