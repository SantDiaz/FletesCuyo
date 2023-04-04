import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatosFlete, hora, minutos, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.scss'],
})
export class Paso1Component implements OnInit {

registerU: UserU; 
loading: any;
data:any;

horas = hora
minuto = minutos

pasosFlete: DatosFlete={
  // rta: null,
  fecha: null,
  hora: null,
  minutos: null,
  uDesde: '',
  uHasta: '',
  cargamento: '',
  tipoVehiculo:  null,
  ayudantes:  null ,
  uid:  "" ,
  id: '',
  precio: null,
 };
//  

  


constructor(private routes: Router,
  private db: FirestoreService,
  private authS: AuthService, 
  public toastController: ToastController,
  private loadingCtrl: LoadingController, ) { }

  ngOnInit() {}



//   enviar(){
//     this.authS.stateUser<UserU>().subscribe( res  => {
//       if (res) {
//         this.presentLoading();
        
//         const data = this.pasosFlete;
//         const enlace = '/PedirFlete3';
//         data.uid = this.db.createId();
//         this.db.createDoc<DatosFlete>(data, enlace, data.id).then((_) =>{
//             this.presentToast('Guardado con exito', 2000);
//             this.loading.dismiss();
//                 this.pasosFlete={
//                     fecha: null,
//                     hora: null,
//                     uDesde: '',
//                     uHasta: '',
//                     minutos: null,
//                     cargamento: '',
//                     tipoVehiculo:  null,
//                     ayudantes:  null ,
//                     uid:  null ,
//                     id: res.uid,
//                   };
//              this.routes.navigate(['/paso2'])
//         } );

//       } else {
//          this.routes.navigate(['/login'])
//       }   
//   }) 
// }   


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
        this.routes.navigate(['/paso2']);
        this.pasosFlete={
          // rta: null,
          fecha: null,
          hora: null,
          minutos: null,
          uDesde: '',
          uHasta: '',
          cargamento: '',
          tipoVehiculo:  null,
          ayudantes:  null ,
          uid:  null ,
          id: res.uid,
          precio: null,
          // rta: null,
         };
    } );
  }   
}) 
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

}
