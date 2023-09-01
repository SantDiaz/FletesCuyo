import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { datosVehiculo, tipoVehiculo, UserF } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss'],
})
export class Form2Component implements OnInit {

  registerF: UserF; 
  Datovehicular: datosVehiculo = {
    uid: null,
    tipoVehiculo: null,
    marca: null,
    modelo: null,
    patente: null,
    imagePatente: null,
  }

loading: any;
vehiculo = tipoVehiculo;
  



  constructor(private routes: Router,
              private db: FirestoreService,
              public toastController: ToastController,
              private loadingCtrl: LoadingController,
              private authS: AuthService, ) {   
                  

  }
          

  ngOnInit() {}




  // enviar(){
  //   this.authS.stateUser<UserF>().subscribe( res  => {
  //     if (res) {
  //       // console.log('la respuesta es:', res);
  //       this.presentLoading();
  //       const data = this.Datovehicular;
  //       const enlace = `/Fleteros/${res.uid}/DatosVehicular`;
  //       const id = res.uid;
  //       // console.log('id es:', id);
  //       this.db.createDoc<datosVehiculo>(data, enlace, id).then((_) =>{
  //         // console.log('name,', id)
  //           this.presentToast('Guardado con exito', 2000);
  //           this.loading.dismiss();
  //           this.Datovehicular={
  //             uid: '',
  //             tipoVehiculo: null,
  //             marca: null,
  //             modelo: null,
  //             patente: null,
  //            };
  //            this.routes.navigate(['/home'])
  //       } );

  //     } else {
  //        this.routes.navigate(['/login'])
  //     }   
  // }) 
  
  
// }




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

// async siguiente(){
//   this.interaction.presentLoading("Registrando...")
//   const res = await this.authS.getCollection<datosVehiculo>(uid).catch(error =>{
//     console.log(error);
//     this.interaction.closeLoading();
//     this.interaction.presentToast('error')
//   })
//   if (res) {
//     console.log("funciona con exito");
//     const path = 'Fleteros'
//     const id = res.user.uid;
//     this.Datovehicular.uid = id;
//     await this.db.createDoc(this.Datovehicular, path, id);
//     this.interaction.closeLoading();
//     await this.interaction.presentToast('Guardado con exito');
//     this.routes.navigate(['/formF2']);
//   // }
// }

// }
 }