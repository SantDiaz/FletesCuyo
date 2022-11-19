import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapsPlacesService } from './maps-places.service';

@Component({
  selector: 'app-maps-google',
  templateUrl: './maps-google.component.html',
  styleUrls: ['./maps-google.component.scss'],
})
export class MapsGoogleComponent implements OnInit {

  @Input() position ={
      lat: -2.898116,
      lng: -78.9995814999999
  }

  label={
    titulo: 'Desde',
    subtitulo: 'Partida',
  }

  map: any;
  marker: any;
  infowindow: any;
  positionSet: any;

  @ViewChild('map') divMap: ElementRef;

  constructor(
            private renderer: Renderer2,
            @Inject(DOCUMENT) private document,
            private MapsPlacesService: MapsPlacesService,
            public modalController: ModalController,
  ) { }

  ngOnInit(): void {
      this.init();
  }


  async init(){
      this.MapsPlacesService.init(this.renderer, this.document).then( () =>{
          // this.initMap();
      } ).catch((err) =>{
        console.log('arrrr');
      });
  }

}
