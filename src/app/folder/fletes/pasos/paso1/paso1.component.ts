import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pasos } from 'src/app/folder/models/models';
import { FirestoreService } from 'src/app/folder/services/firestore.service';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.scss'],
})
export class Paso1Component implements OnInit {
  
data:any;
 pasosFlete: Pasos={
  id: '',
  nombre: '',
  dni: '',
  direccion: '',
  telefono: null,
  // fecha: null,
  // hora: null,
  // uDesde: '',
  // uHasta: '',
  // cargamento: '',
  // tipoVehiculo: null ,
  // ayudantes:  null ,
 };
//  
  
  constructor(private routes: Router,
              private db: FirestoreService) { }

  ngOnInit() {}




  redi(){
    // console.log("funciona -->", this.pasosFlete)
    this.routes.navigate(['/paso2']);
    const data = this.pasosFlete;
    data.id = this.db.createId();
    const enlace = "DatosFlete"
    this.db.createDocument<Pasos>(data, enlace);
  }

}
