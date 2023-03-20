import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ayudantes, DatosFlete, hora, minutos, Pasos, tipoVehiculo, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.scss'],
})
export class Paso2Component implements OnInit {

  vehiculos = tipoVehiculo;
  ayudante = ayudantes;
  registerU: UserU; 
  loading: any;
  horas = hora
  minuto = minutos
  

  pasosFlete: DatosFlete={
    fecha: null,
    hora: null,
    minutos: null,
    uDesde: '',
    uHasta: '',
    cargamento: '',
    tipoVehiculo:  null,
    ayudantes:  null ,
    uid:  null ,
    id: '',
    precio: null,

   };

  



  constructor(private routes: Router,
              private db: FirestoreService,
              private authS: AuthService, 
              public toastController: ToastController,
              private loadingCtrl: LoadingController, ) { }

  ngOnInit() {

    
  }


  enviar(){
    this.authS.stateUser<UserU>().subscribe( res  => {
  if (res) {
    
    this.presentLoading();
    const data = this.pasosFlete;
    data.uid = this.db.createId();
    data.id = res.uid;
const enlace = "PedirFlete3"
this.db.createDoc<DatosFlete>(data, enlace, data.uid).then((_) =>{
    this.presentToast('Guardado con exito', 2000);
    this.loading.dismiss();
    this.routes.navigate(['/paso3']);
    this.pasosFlete={
      fecha: null,
      hora: null,
      minutos: null,
      uDesde: '',
      uHasta: '',
      cargamento: '',
      tipoVehiculo:  null,
      ayudantes:  null ,
      uid:  null ,
      precio: null,
      id: res.uid,
     };
} );
}   
}) 
} 



  
  // enviar(){
  //   this.presentLoading();
  //   const data = this.DatosFlete;
  //   data.id = this.db.createId();
  //   const enlace = "PedirFlete"
  //   this.db.createDoc<DatosFlete>(data, enlace, data.id).then((_) =>{
  //       this.presentToast('Guardado con exito', 2000);
  //       this.loading.dismiss();
  //       this.routes.navigate(['/home']);
  //       this.DatosFlete={
  //         fecha: null,
  //         hora: null,
  //         uDesde: '',
  //         uHasta: '',
  //         cargamento: '',
  //         tipoVehiculo:  null,
  //         ayudantes:  null ,
  //         id:  "" ,
  //        };
  //   } );


 

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
