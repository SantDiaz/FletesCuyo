import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ayudantes, DatosFlete, hora, minutos, provincias, tipoVehiculo, UserF, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.scss'],
})
export class Paso1Component implements OnInit {
  rol: 'Usuario' | 'Fletero'| 'Admin' = null;
registerU: UserU; 
loading: any;
data:any;
provincia = provincias;
vehiculos = tipoVehiculo;
ayudante = ayudantes;
horas = hora
minuto = minutos


items = [];
valueSelected:string = "1";

pasosFlete: DatosFlete={
  // rta: null,
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
  uid:  "" ,
  id: '',
  precio: null,
 };
//  

  


constructor(private routes: Router,
  private db: FirestoreService,
  private interaction: InteractionService,
  private authS: AuthService, 
  public toastController: ToastController,
  private loadingCtrl: LoadingController, ) { }

  ngOnInit() {}



  enviar(){
        this.authS.stateUser<UserU>().subscribe( res  => {
          
      if (res ) {
        const path = 'Usuarios'
        this.db.getDoc<UserF>(path, res.uid).subscribe( res2 => {
        this.interaction.presentLoading;
        const data = this.pasosFlete;
        // data.uid = this.db.createId();
        data.uid = res.uid;
        data.nombre = res2.nombre
        data.apellido = res2.apellido
        // data.id = res.uid;
        console.log("estos:", data.uid);
        console.log("estos:", data.id);

    // const enlace = `PedirFlete/${res.uid}/Pedidos`;
    const enlace = `PedirFlete3`;
    
    this.db.createDoc<DatosFlete>(data, enlace, data.uid).then((_) =>{
        this.interaction.presentToast('Enviado con exito');
        this.interaction.closeLoading;
        this.routes.navigate(['/home']);
        this.pasosFlete={
          nombre: '',
          apellido: '',
          fecha: data.fecha,
          hora: data.hora,
          minutos: data.minutos,
          uDesde: data.uDesde,
          uHasta: data.uHasta,
          cargamento: data.cargamento,
          tipoVehiculo:  data.tipoVehiculo,
          ayudantes:  data.ayudantes,
          uid:  res.uid ,
          id: data.id,
          precio: null,
         };
        } );
    } );
  }   
}) 
  } 


  async  enviar2(){
    this.interaction.presentLoading;
    this.authS.stateUser().subscribe( res => {

      if (res ) {
        const path = 'PedirFlete3';
        this.db.getDoc<DatosFlete>(path, res.uid).subscribe( res2 => {

          const rta22 = this.pasosFlete; 
          // console.log('id Fletero:', res.uid)
          // console.log('id Usuario: ', nuevoDato.id);
          console.log('rta: ', rta22);
        const enlace = `PedirFlete3`;
        rta22.fecha = res2.fecha;
        rta22.hora = res2.hora;
        rta22.minutos = res2.minutos;
       rta22.nombre = res2.nombre
       rta22.apellido = res2.apellido
      
      this.db.createDoc<DatosFlete>(rta22, enlace,  res.uid ).then((_) =>{
        this.interaction.presentToast('Enviado con exito');
        this.interaction.closeLoading;
        this.pasosFlete={
          nombre: '',
          apellido: '',
          fecha: rta22.fecha,
          hora: rta22.hora,
          minutos: rta22.minutos,
          uDesde: rta22.uDesde,
          uHasta: rta22.uHasta,
          cargamento: rta22.cargamento,
          tipoVehiculo:  rta22.tipoVehiculo,
          ayudantes:  rta22.ayudantes,
          uid:  res.uid ,
          id: rta22.id,
          precio: null,
         };
        } );
      });
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

segmentChanged(event: CustomEvent){
  this.valueSelected = event.detail.value;
  console.log(this.valueSelected);
}

}
