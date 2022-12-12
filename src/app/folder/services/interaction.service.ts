import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  loading: any;

  constructor(public toastController: ToastController,
              public loadingController: LoadingController,
              public alerController: AlertController) { }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: mensaje,
    });
    await this.loading.present();


  }

  async closeLoading() {
    await this.loading.dismiss();
  }

 async presentAlert(texto: string, subtitulo: string) {

    let aceptar = false;
    const alert = await this.alerController.create({
      cssClass: 'my-custom-class',
      header: texto,
      subHeader: subtitulo,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Okay',
          handler: ()=>{
            aceptar = true;
          }
        },
      ],
    });

    await alert.present();
    await alert.onDidDismiss();
    return aceptar;
  }
  
}