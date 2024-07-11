import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ayudantes, DatosFlete, hora, minutos, provincias, tipoVehiculo, UserF, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { NuevoService } from 'src/app/folder/services/nuevo.service';
import { MapboxComponent } from '../../../mapbox/mapbox.component';


@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.scss'],
})
export class Paso1Component implements OnInit {
  rol: 'Usuario' | 'Fletero'| 'Admin' = null;
  minDate: string; // Propiedad para almacenar la fecha mínima
  private formularioEnviado: boolean = false;
  currentStep: number = 1; // Paso actual del stepper

registerU: UserU; 
loading: any;
data:any;
startCoordinates: { latitude: number, longitude: number };
endCoordinates: { latitude: number, longitude: number };
vehiculos = tipoVehiculo;
ayudante = ayudantes;
provincia = provincias;
fechaBase: Date;
tiempoTranscurrido: string; 
items = [];
valueSelected:any = "1";
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
  private interaction: InteractionService,
  private authS: AuthService, 
  private modal: ModalController,
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

  async enviarDatos() {
    await this.interaction.presentLoading("Enviando...");
  
    // Validar el formulario
    if (this.validateForm()) {
      console.log("Formulario válido. Procesando datos...");
  
      // Aquí va el código para enviar los datos
      const startCoordinates = this.startCoordinates;
      const endCoordinates = this.endCoordinates;
  
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
              data.uDesde = this.pasosFlete.uDesde
              data.uHasta = this.pasosFlete.uHasta
              data.cargamento = this.pasosFlete.cargamento 
              data.tipoVehiculo = this.pasosFlete.tipoVehiculo
              data.ayudantes = this.pasosFlete.ayudantes
              data.startCoordinates = startCoordinates;
              data.endCoordinatesP = endCoordinates;
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
                  this.router.navigate(['/home']);
                  return;
                });
              }
            });
          });
        }
      });
    } else {
      // Si la validación falla, cierra el loading y muestra un mensaje de error
      this.interaction.closeLoading();
      this.interaction.presentToast('Debes terminar de hacer el pedido');
      console.log("Formulario no válido. Por favor, corrige los errores.");
    }
  }
  

  siguiente() {
    if (parseInt(this.valueSelected) === 1) {
      // Si aún estamos en el primer paso, cambia al segundo paso
      this.valueSelected = '2'; // Asegúrate de que el valor asignado sea una cadena
    } else {
      // Si estamos en el segundo paso, envía los datos
    }
  }

  btn1(){
      this.valueSelected = '1'; // Asegúrate de que el valor asignado sea una cadena
  }
  
  btn2(){
      this.valueSelected = '2'; // Asegúrate de que el valor asignado sea una cadena
  }

  // enviarDatos() {
  //   console.log(first)
  //   // Aquí agregas la lógica para enviar los datos recolectados
  // }
    
 
  
  
    // Métodos para cambiar el paso del stepper
    goToStep(step: number) {
      this.currentStep = step;
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



// VALIDADORES



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





  ///MAPSSS



async abrirMapa() {
  const modal = await this.modal.create({
    component: MapboxComponent,
    componentProps: {
      datos: 'Datos que quieras pasar al modal',
      paso1ComponentRef: this, // Pasa una referencia al componente actual
    },
  });

  modal.onDidDismiss().then((result) => {
    if (result.role === 'ubicacionesSeleccionadas' && result.data) {
      // Los datos de ubicaciones seleccionadas están disponibles en result.data
      const ubicaciones = result.data;
      // Puedes manejar las ubicaciones como desees en este componente
      console.log('Ubicaciones seleccionadas:', ubicaciones);
    }
  });

  await modal.present();
}

receiveCoordinates(coordinatesData: any) {
  // Aquí puedes manejar las coordenadas como desees
  console.log('Coordenadas recibidas:', coordinatesData);
  // Puedes utilizar las coordenadas en tu lógica de negocio

  // Verifica que las coordenadas de inicio y fin estén disponibles en coordinatesData y pásalas correctamente
  const startCoordinates = coordinatesData.start;
  const endCoordinates = coordinatesData.end;

  // Luego, puedes asignarlas a las propiedades correspondientes en tu componente
  this.startCoordinates = startCoordinates;
  this.endCoordinates = endCoordinates;
}


// Método para confirmar las ubicaciones en tu formulario
confirmarUbicaciones(ubicaciones: string[]) {
  // Asigna las ubicaciones a los campos de entrada
  this.pasosFlete.uDesde = ubicaciones[0];
  this.pasosFlete.uHasta = ubicaciones[1];
}


}
