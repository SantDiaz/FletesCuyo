import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ayudantes, DatosFlete, hora, minutos, provincias, tipoVehiculo, UserF, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { NuevoService } from 'src/app/folder/services/nuevo.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.scss'],
})
export class Paso1Component implements OnInit {
  rol: 'Usuario' | 'Fletero'| 'Admin' = null;
  minDate: string; // Propiedad para almacenar la fecha mínima
  private formularioEnviado: boolean = false;

registerU: UserU; 
loading: any;
data:any;
provincia = provincias;
vehiculos = tipoVehiculo;
ayudante = ayudantes;
fechaBase: Date;
tiempoTranscurrido: string; 
items = [];
valueSelected:string = "1";
pasosFlete: DatosFlete={
  nombre: '',
  apellido: '',
  fecha: '',
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
tiempoTranscurrido$: Observable<string>;

  


constructor(private routes: Router,
  private db: FirestoreService,
  private bd: NuevoService,
  private interaction: InteractionService,
  private authS: AuthService, 
  public toastController: ToastController,
  private loadingCtrl: LoadingController,
  private router: Router ) { 
    const fechaActual = new Date();
    const horaActual = fechaActual.getHours();
    const minutosActuales = fechaActual.getMinutes();
    this.fechaBase = new Date();
    const currentDate = new Date();
    this.minDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
    this.pasosFlete = {
      id: '',
      nombre: '',
      apellido: '',
      fecha: fechaActual.toISOString(),
      hora: horaActual,
      minutos: minutosActuales,
      uDesde: '',
      uHasta: '',
      cargamento: '',
      tipoVehiculo: null,
      ayudantes: null,
      uid: "",
      precio: null,
      tiempoTranscurrido: '', // Inicializa el tiempo transcurrido como una cadena vacía
    };
  
  }

  ngOnInit() {
    
  }

  async enviar() {
    await this.interaction.presentLoading("Enviando...");
  
    this.authS.stateUser<UserU>().subscribe((res) => {
      if (res) {
        const path = 'Usuarios';
        this.db.getDoc<UserF>(path, res.uid).subscribe((res2) => {
          this.interaction.presentLoading;
  
          const path = `Usuarios/${res.uid}/DatosPersonales`;
          this.db.getDoc<UserU>(path, res.uid).subscribe((res2) => {
            const data = this.pasosFlete;
            data.id = this.db.createId();
            data.uid = res.uid;
            data.nombre = res2.nombre;
            data.apellido = res2.apellido;
            const fechaBase = new Date(this.pasosFlete.fecha);
            data.hora = fechaBase.getHours();
            data.minutos = fechaBase.getMinutes();
            // Resto del código...
            data.image = res2.image;
            const enlace = `PedirFlete/${res.uid}/Pedidos`;
            const pedidoId = data.id;
            this.interaction.closeLoading();
            if (this.formularioEnviado === false) {
            this.db.createDocument<DatosFlete>(data, enlace, pedidoId).then((_) => {
              this.pasosFlete.image = this.pasosFlete.image; 
              this.interaction.presentToast('Enviado con éxito');
              this.interaction.closeLoading();
              this.valueSelected === "2";
              this.formularioEnviado = true; // Establece la bandera en true
              this.router.navigate(['/paso2', { pedidoId: data.id }]);
              return;
              
            });
          }
          });
        });
      }
    });
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
