import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatosFlete, Pasos, UserU } from 'src/app/folder/models/models';
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
 pasosFlete: DatosFlete={

  fecha: null,
  hora: null,
  uDesde: '',
  uHasta: '',
  cargamento: '',
  tipoVehiculo:  null,
  ayudantes:  null ,
  id:  "" ,
  
 };
//  
  


constructor(private routes: Router,
  private db: FirestoreService,
  private authS: AuthService, 
  public toastController: ToastController,
  private loadingCtrl: LoadingController, ) { }

  ngOnInit() {}



  enviar(){
    this.authS.stateUser<UserU>().subscribe( res  => {
      if (res) {
        // console.log('la respuesta es:', res);
        this.presentLoading();
        const data = this.pasosFlete;
        const enlace = '/PedirFlete2';
        const id = res.uid;
        // console.log('id es:', id);
        this.db.createDoc<DatosFlete>(data, enlace, id).then((_) =>{
          // console.log('name,', id)
            this.presentToast('Guardado con exito', 2000);
            this.loading.dismiss();
                this.pasosFlete={
                    fecha: null,
                    hora: null,
                    uDesde: '',
                    uHasta: '',
                    cargamento: '',
                    tipoVehiculo:  null,
                    ayudantes:  null ,
                    id:  "" ,
                  };
             this.routes.navigate(['/home'])
        } );

      } else {
         this.routes.navigate(['/login'])
      }   
  }) 

  // enviar(){
  //   this.presentLoading();
  //   const data = this.pasosFlete;
  //   data.id = this.db.createId();
  //   const enlace = "PedirFlete"
  //   this.db.createDoc<DatosFlete>(data, enlace, data.id).then((_) =>{
  //       this.presentToast('Guardado con exito', 2000);
  //       this.loading.dismiss();
  //       this.routes.navigate(['/home']);
  //       this.pasosFlete={
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
