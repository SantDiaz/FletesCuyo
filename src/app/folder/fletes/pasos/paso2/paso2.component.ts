import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ayudantes, DatosFlete, hora, minutos, tipoVehiculo, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { NuevoService } from 'src/app/folder/services/nuevo.service';


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
    nombre: '',
    apellido: '',
    fecha: null,
    hora: null,
    minutos: null,
    uDesde: '',
    uHasta: '',
    cargamento: '',
    tipoVehiculo:  null,
    ayudantes:  null ,
    uid:  null ,
    // respuesta: null,
    id: '',
    precio: null,
   };

  



  constructor(private routes: Router,
              private db: FirestoreService,
              private nuevo: NuevoService,
              private authS: AuthService, 
              private interaction : InteractionService,
              public toastController: ToastController,
              private loadingCtrl: LoadingController, ) { }

  ngOnInit() {

    
  }


  enviar(){
    this.authS.stateUser<UserU>().subscribe( res  => {
  if (res) {
    
    this.interaction.presentLoading;
    const data = this.pasosFlete;
    // data.uid = this.db.createId();
    // data.id = res.uid;
    console.log("este id:", data.uid)
// const enlace = "PedirFlete3"
const enlace = `PedirFlete4/${res.uid}/Pedidos/${data.uid}`;
this.nuevo.update( enlace, data.uid, data).then((_) =>{
    this.interaction.presentToast('Guardado con exito');
    this.interaction.closeLoading();
    this.routes.navigate(['/home']);
    this.pasosFlete={
      nombre: '',
      apellido: '',
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
      // respuesta: null,
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
