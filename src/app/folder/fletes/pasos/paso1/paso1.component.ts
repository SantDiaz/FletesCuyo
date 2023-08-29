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
  private loadingCtrl: LoadingController,
  private router: Router ) { }

  ngOnInit() {}

  async enviar(){

    await  this.interaction.presentLoading("Enviando...");
      this.authS.stateUser<UserU>().subscribe( res  => {

    if (res ) {
      const path = 'Usuarios'
   this.db.getDoc<UserF>(path, res.uid).subscribe( res2 => {
      this.interaction.presentLoading;
      const path = `Usuarios/${res.uid}/DatosPersonales`
   this.db.getDoc<UserU>(path, res.uid).subscribe( res2 => {
     const data = this.pasosFlete;
     data.uid = this.db.createId();
     data.id = res.uid;
     data.nombre = res2.nombre
     data.apellido = res2.apellido
     // data.id = res.uid;
     console.log("estos:", data.uid);
      console.log("estos:", data.id);
      const enlace = `PedirFlete/${res.uid}/Pedidos`;
      const pedidoId = data.uid
      this.interaction.closeLoading();
      this.db.createDocument<DatosFlete>( data, enlace, pedidoId).then((_) =>{
      this.interaction.presentToast('Enviado con exito');
      this.interaction.closeLoading;
      this.valueSelected === "2";
      // this.routes.navigate(['/home']);
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
      // this.router.navigate(['/paso2', { pedidoId: data.uid }]);
      this.router.navigate(['/paso2', { pedidoId: data.uid,}]);
    } );
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

segmentChanged(event: CustomEvent){
  this.valueSelected = event.detail.value;
  console.log(this.valueSelected);
}

}
