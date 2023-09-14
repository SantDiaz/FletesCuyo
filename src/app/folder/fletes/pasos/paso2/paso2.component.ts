import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ayudantes, DatosFlete, hora, minutos, tipoVehiculo, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { NuevoService } from 'src/app/folder/services/nuevo.service';
import { MapboxComponent } from '../../../mapbox/mapbox.component';
import { ModalController } from '@ionic/angular';


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
              private route: ActivatedRoute,
              private modal: ModalController ) { }

  ngOnInit() {

  }
  
  

  validateDesde() {
    // Check if the marca field is empty or contains only whitespace
    if (!this.pasosFlete.uDesde || this.pasosFlete.uDesde.length < 3) {
    return !this.pasosFlete.uDesde || this.pasosFlete.uDesde.trim() === '';
     }
  }
  validateHasta() {
    // Check if the marca field is empty or contains only whitespace
    if (!this.pasosFlete.uHasta || this.pasosFlete.uHasta.length < 3) {

    return !this.pasosFlete.uHasta || this.pasosFlete.uHasta.trim() === '';
  }
}
  validateCargamento() {
    // Check if the marca field is empty or contains only whitespace
    return !this.pasosFlete.cargamento || this.pasosFlete.cargamento.trim() === '';
  }

  validateTipoVehiculo() {
    // Check if the tipoVehiculo field is not one of the allowed types
    const allowedTypes: ('Camioneta' | 'Camion' | 'Utilitario')[] = ['Camioneta', 'Camion', 'Utilitario'];
    return !this.pasosFlete.tipoVehiculo || !allowedTypes.includes(this.pasosFlete.tipoVehiculo);
  }
  validateAyudantes() {
    // Check if the tipoVehiculo field is not one of the allowed types
    const allowedTypes: ('Sin ayudantes' | '+1' | '+2'  | '+3')[] = ['Sin ayudantes' , '+1' , '+2'  , '+3'];
    return !this.pasosFlete.ayudantes || !allowedTypes.includes(this.pasosFlete.ayudantes);
  }

  validateForm(): boolean {
  
    // Validación para el campo tipoVehiculo
    if (!this.pasosFlete.tipoVehiculo || 
      (this.pasosFlete.tipoVehiculo !== 'Camioneta' &&
       this.pasosFlete.tipoVehiculo !== 'Camion' &&
       this.pasosFlete.tipoVehiculo !== 'Utilitario')) {
    return false; // Validación fallida para el campo tipoVehiculo
  }

  if (!this.pasosFlete.ayudantes || 
    (this.pasosFlete.ayudantes !== 'Sin ayudantes' &&
     this.pasosFlete.ayudantes !== '+1' &&
     this.pasosFlete.ayudantes !== '+2' &&  this.pasosFlete.ayudantes !== '+3')) {
  return false; // Validación fallida para el campo tipoVehiculo
}
  
    // Validación para el campo marca
    if (!this.pasosFlete.uDesde || this.pasosFlete.uDesde.trim() === '') {
      return false; // Validación fallida para el campo marca
    }
  
    // Validación para el campo modelo
    if (!this.pasosFlete.uHasta || this.pasosFlete.uHasta.trim() === '') {
      return false; // Validación fallida para el campo modelo
    }
  
    // Validación para el campo modelo
    if (!this.pasosFlete.cargamento || this.pasosFlete.cargamento.trim() === '') {
      return false; // Validación fallida para el campo modelo
    }
  
  
    return (
      !this.validateDesde() &&
      !this.validateHasta() &&
      !this.validateCargamento()  && 
      !this.validateTipoVehiculo()  &&
      !this.validateAyudantes()
    );  }

  async enviar3() {
  this.validateForm();

  // Continuar con el envío de datos si todas las validaciones son exitosas
  // ... Código para enviar los datos aquí ...

  // Esto solo se ejecutará si todas las validaciones son exitosas
  console.log("Formulario válido. Procesando datos...");
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
          data.id = res2.id
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






///MAPSSS



async abrirMapa() {
  const modal = await this.modal.create({
    component: MapboxComponent,
    componentProps: {
      datos: 'Datos que quieras pasar al modal',
      paso2ComponentRef: this, // Pasa una referencia al componente actual
    },
  });

  modal.onDidDismiss().then((result) => {
    if (result.role === 'ubicacionesSeleccionadas' && result.data) {
      // Los datos de ubicaciones seleccionadas están disponibles en result.data
      const ubicaciones = result.data;
      // Llama al método confirmarUbicaciones para asignar las ubicaciones al formulario
      this.confirmarUbicaciones(ubicaciones);
      this.modal.dismiss();
    }
  });

  await modal.present();
}

confirmarUbicaciones(ubicaciones: string[]) {
  // Asigna las ubicaciones a los campos de entrada
  this.pasosFlete.uDesde = ubicaciones[0];
  this.pasosFlete.uHasta = ubicaciones[1];
  // this.modal.dismiss();
}

}
