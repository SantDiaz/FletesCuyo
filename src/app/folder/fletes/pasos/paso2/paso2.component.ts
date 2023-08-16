import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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
  
  private enviado: boolean = false;
  vehiculos = tipoVehiculo;
  ayudante = ayudantes;
  registerU: UserU; 
  loading: any;
  horas = hora
  minuto = minutos
  valueSelected:string = "2";
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
              private loadingCtrl: LoadingController,
              private router: Router ) { }

  ngOnInit() {

    
  }




  
 async enviar2() {
    if (!this.enviado) { // Verificar si la función aún no se ha ejecutado
      this.enviado = true; // Marcar la función como ejecutada
    await  this.interaction.presentLoading("Enviando...");
      this.authS.stateUser<UserU>().subscribe(res => {
        if (res) {
          const path = `PedirFlete`;
          this.db.getDoc<DatosFlete>(path, res.uid).subscribe(res2 => {
            const data = this.pasosFlete;
            data.nombre = res2.nombre;
            data.apellido = res2.apellido;
            data.fecha = res2.fecha;
            data.hora = res2.hora;
            data.minutos = res2.minutos;
            data.uid = res.uid;
  
            const enlace = `PedirFlete`;
            
            
            // this.router.navigate(['/paso3']);
            this.nuevo.update(enlace, data.uid, data).then(() => {
              this.interaction.closeLoading(); // Cerrar la carga
              // this.pasosFlete = {
              //   nombre: res2.nombre,
              //   apellido: res2.apellido,
              //   fecha: res2.fecha,
              //   hora: res2.hora,
              //   minutos: res2.minutos,
              //   uDesde: data.uDesde,
              //   uHasta: data.uHasta,
              //   cargamento: data.cargamento,
              //   tipoVehiculo: data.tipoVehiculo,
              //   ayudantes: data.ayudantes,
              //   uid: res.uid,
              //   id: data.id,
              //   precio: null,
              // };
            });
          });
        }
      });
    }
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
