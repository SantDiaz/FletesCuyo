import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  private pedidoId: string; // Agrega esta línea
  public enviado = false;
  
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
              private firestore: AngularFirestore,
              private interaction : InteractionService,
              public toastController: ToastController,
              private loadingCtrl: LoadingController,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {

  }
  
  

  
  
  async enviar3() {
    if (this.enviado) {
      return; // Ya se ha enviado, no hagas nada
    }
    this.pedidoId = this.route.snapshot.paramMap.get('pedidoId');
    console.log("este id trae",this.pedidoId);
    const idPrimer = this.pedidoId;
    this.authS.stateUser<UserU>().subscribe(res => {
      if (res) {
        console.log("respuestacomun", res.uid);
        const path = `PedirFlete/${res.uid}/Pedidos/`;
        this.db.getDoc<DatosFlete>(path, idPrimer).subscribe(res2 => {
          console.log("respuesta2", res2);
          const data = this.pasosFlete;
          data.nombre = res2.nombre;
          data.apellido = res2.apellido;
          data.fecha = res2.fecha;
          data.hora = res2.hora;
          data.minutos = res2.minutos;
          data.uid = res.uid;
          console.log('id a editar', idPrimer);
          
          const enlace = `PedirFlete/${res.uid}/Pedidos`;
          this.db.updateDoc(enlace, idPrimer, data)
            .then(() => {
              console.log('Actualización exitosa');
              this.enviado = true;
              setTimeout(() => {
                // Tu código de redirección aquí
                window.location.href = '/home';
              }, 0);
            })
            .catch(error => {
              console.error('Error al actualizar:', error);
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



  rediBack(){
    this.routes.navigate(['/fletes']);
  }

}
