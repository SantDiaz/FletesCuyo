import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ayudantes, DatosFlete, Pasos, tipoVehiculo } from 'src/app/folder/models/models';
import { FirestoreService } from 'src/app/folder/services/firestore.service';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.scss'],
})
export class Paso2Component implements OnInit {
  
  DatosFlete: DatosFlete={
    fecha: null,
    hora: null,
    uDesde: '',
    uHasta: '',
    cargamento: '',
    tipoVehiculo:  null,
    ayudantes:  null ,
    id:  "" ,
    
   };
   loading: any;

   vehiculos = tipoVehiculo;
   ayudante = ayudantes;
  



  constructor(private routes: Router,
              private db: FirestoreService,
              public toastController: ToastController,
              private loadingCtrl: LoadingController, ) { }

  ngOnInit() {}

  enviar(){
    this.presentLoading();
    const data = this.DatosFlete;
    data.id = this.db.createId();
    const enlace = "PedirFlete"
    this.db.createDoc<DatosFlete>(data, enlace, data.id).then((_) =>{
        this.presentToast('Guardado con exito', 2000);
        this.loading.dismiss();
        this.routes.navigate(['/home']);
        this.DatosFlete={
          fecha: null,
          hora: null,
          uDesde: '',
          uHasta: '',
          cargamento: '',
          tipoVehiculo:  null,
          ayudantes:  null ,
          id:  "" ,
         };
    } );


  } 

  async presentToast(mensaje: string, tiempo: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo,
      position: 'middle'
    });
    await toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Guardando',
    });

   await this.loading.present();
  }



  rediBack(){
    this.routes.navigate(['/fletes']);
  }

}
