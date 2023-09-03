import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef   } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatosFlete, datosVehiculo, respuesta, UserF, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { NuevoService } from 'src/app/folder/services/nuevo.service';
import 'firebase/firestore';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  login: boolean = false;
  rol: 'Usuario' | 'Fletero' | 'Admin' = null;
  loading: any;
  fletes : any = [] ;
  // pasosFlete: DatosFlete[] = []
  datoss: UserU;
  DatosV: datosVehiculo;
  pasosFlete2: DatosFlete = {
    nombre: '',
    apellido: '',
    fecha: null,
    hora: null,
    minutos: null,
    uDesde: '',
    uHasta: '',
    cargamento: '',
    tipoVehiculo: null,
    ayudantes: null,
    uid: "",
    id: '',
    precio: null,
  };
  private updateInterval = 60000; // Actualizar cada 60 segundos (1 minuto)
  
  rta: respuesta = {
    id: '',
    idFletero: '',
    nombre: '',
    apellido: '',
    precio: null,
    mensaje: '',
    precioEnviado: false, // Agrega esta propiedad
  };
  pasosFlete: DatosFlete[] = [];
  selectedSegment = 'seccion1'; // Segmento seleccionado por defecto
  fletesRespondidos: DatosFlete[] = [];

  constructor(
        private auth: AuthService,
        private router: Router,
        private interaction: InteractionService,
        private db: FirestoreService,
        private database: NuevoService,
        public toastController: ToastController,
        private loadingCtrl: LoadingController,
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute,
  ) { 
    this.pasosFlete = this.fletes.filter(flete => !flete.precioEnviado);
    this.fletesRespondidos = this.fletes.filter(flete => flete.precioEnviado);
    setInterval(() => {
      this.actualizarTiempoTranscurridoEnColeccion();
    }, this.updateInterval); 
  }

  ngOnInit() {
    this.fletesRespondidos = [];
    const usersCollectionPath = 'Usuarios';
    firebase.firestore().collection(usersCollectionPath).get()
      .then(querySnapshot => {
        const userIDs = querySnapshot.docs.map(doc => doc.id);
        // console.log('userIDs: ', userIDs);
        
        const allFletes = []; // Arreglo que almacenará todos los pedidos de todos los usuarios
        // Ahora puedes usar los IDs de los usuarios para acceder a sus pedidos
        userIDs.forEach(uid => {
          const pedidosCollectionPath = `PedirFlete/${uid}/Pedidos/`;
          // const pedidosCollectionPath = `PedirFlete3`;
          // console.log('enlace', pedidosCollectionPath);
    
          this.database.getAll(pedidosCollectionPath).then(res =>{
            res.subscribe(resRef=>{
              const userFletes = resRef.map(pasosRef =>{
                let pasosFlete = pasosRef.payload.doc.data() as DatosFlete;
                pasosFlete['id'] = pasosRef.payload.doc.id;
                this.actualizarPedidos();
                      // Convierte la cadena de fecha en un objeto Date
                      // const fechaEnMilisegundos = Date.parse(pasosFlete.fecha);
                      // if (!isNaN(fechaEnMilisegundos)) {
                      //   // Calcula el tiempo transcurrido en segundos
                      //   const ahora = new Date().getTime();
                      //   const tiempoTranscurrido = (ahora - fechaEnMilisegundos) / 1000;
              
                      //   // Convierte el tiempo transcurrido a cadena de texto
                      //   pasosFlete['Enviado hace'] = tiempoTranscurrido.toString();
                      // } else {
                      //   pasosFlete['tiempoTranscurrido'] = ''; // Si la fecha no es válida, asigna una cadena vacía
                      // }
                      return pasosFlete;
                
              })
              allFletes.push(...userFletes); // Agregar los pedidos del usuario actual al arreglo total
              this.cdr.detectChanges();
            })
              })
              .catch(error => {
                console.error(`Error fetching pedidos for user with ID ${uid}:`, error);
              });
              this.fletes = allFletes; // Asignar todos los pedidos al arreglo fletes al final
            })
      })
      .catch(error => {
        console.error("Error fetching user IDs:", error);
      });
  }
  trackByFn(index, item) {
  return item.id; // Suponiendo que cada elemento tiene un campo "id" único
}

actualizarTiempoTranscurridoEnColeccion() {
  // Obtén la referencia a la colección que contiene los pedidos
  const pedidosCollectionPath = 'Pedidos';

  // Consulta la colección de pedidos
  this.database.getAll(pedidosCollectionPath).then(res => {
    res.subscribe(resRef => {
      resRef.forEach(pasosRef => {
        const pasosFlete = pasosRef.payload.doc.data() as DatosFlete;

        // Calcula el tiempo transcurrido como lo hacías en Paso1Component
        const ahora = new Date().getTime();
        const fechaEnMilisegundos = Date.parse(pasosFlete.fecha);

        if (!isNaN(fechaEnMilisegundos)) {
          const tiempoTranscurrido = (ahora - fechaEnMilisegundos) / 1000;
          pasosFlete['tiempoTranscurrido'] = this.formatoTiempoTranscurrido(tiempoTranscurrido);
        } else {
          pasosFlete['tiempoTranscurrido'] = '';
        }

        // Actualiza el documento en Firestore con el nuevo tiempo transcurrido
        const pedidoId = pasosRef.payload.doc.id;
        const pedidoPath = `${pedidosCollectionPath}/${pedidoId}`;
        this.database.updateDocument(pedidoPath, pasosFlete).then(_ => {
          // Realiza las acciones necesarias después de actualizar
        }).catch(error => {
          console.error(`Error updating pedido ${pedidoId}:`, error);
        });
      });
    });
  }).catch(error => {
    console.error("Error fetching pedidos:", error);
  });
}


actualizarPedidos() {
  const userIDs: string[] = ['user1', 'user2', 'user3']; // IDs de usuarios, obtén estos de tu base de datos

  const allFletes: DatosFlete[] = [];

  userIDs.forEach(uid => {
    const pedidosCollectionPath = `PedirFlete/${uid}/Pedidos/`;

    // Obtén los pedidos de cada usuario y suscríbete a cambios
    this.db.getAll(pedidosCollectionPath).subscribe((res) => {
      const userFletes: DatosFlete[] = res.map((pasosRef: any) => {
        const pasosFlete: DatosFlete = pasosRef.payload.doc.data() as DatosFlete;
        pasosFlete.id = pasosRef.payload.doc.id;

        // Calcula el tiempo transcurrido para este pedido
        this.calcularTiempoTranscurrido(pasosFlete);

        return pasosFlete;
      });

      allFletes.push(...userFletes);

      // Actualiza la lista de pedidos en el componente
      this.pasosFlete = allFletes;

      // Notifica a Angular sobre los cambios para actualizar la vista
      this.cdr.detectChanges();
    });
  });
}



calcularTiempoTranscurrido(flete: DatosFlete) {
  const fechaEnMilisegundos = Date.parse(flete.fecha);

  if (!isNaN(fechaEnMilisegundos)) {
    // Obtén la hora actual en milisegundos
    const ahora = new Date().getTime();

    // Calcula el tiempo transcurrido en segundos
    const tiempoTranscurridoSegundos = Math.floor((ahora - fechaEnMilisegundos) / 1000);

    // Actualiza la propiedad tiempoTranscurrido en el objeto DatosFlete
    flete.tiempoTranscurrido = this.formatoTiempoTranscurrido(tiempoTranscurridoSegundos);
  } else {
    // Si la fecha no es válida, asigna una cadena vacía
    flete.tiempoTranscurrido = '';
  }
}

// Función para formatear el tiempo transcurrido en un formato legible
// Función para formatear el tiempo transcurrido en un formato legible
formatoTiempoTranscurrido(segundos: number): string {
  if (segundos < 60) {
    return `enviado hace ${segundos} segundo${segundos !== 1 ? 's' : ''}`;
  } else if (segundos < 3600) {
    const minutos = Math.floor(segundos / 60);
    return `enviado hace ${minutos} minuto${minutos !== 1 ? 's' : ''}`;
  } else if (segundos < 86400) {
    const horas = Math.floor(segundos / 3600);
    return `enviado hace ${horas} hora${horas !== 1 ? 's' : ''}`;
  } else {
    const dias = Math.floor(segundos / 86400);
    return `enviado hace ${dias} día${dias !== 1 ? 's' : ''}`;
  }
}

// card.component.ts
// card.component.ts
mostrarTiempoTranscurrido(tiempoTranscurrido: string) {
  if (!tiempoTranscurrido) {
    return 'Tiempo no disponible';
  }

  const segundos = parseInt(tiempoTranscurrido, 10);

  if (segundos < 60) {
    return `enviado hace ${segundos} segundos`;
  } else if (segundos < 3600) {
    const minutos = Math.floor(segundos / 60);
    return `enviado hace ${minutos} minutos`;
  } else if (segundos < 86400) {
    const horas = Math.floor(segundos / 3600);
    return `enviado hace ${horas} horas`;
  } else {
    const dias = Math.floor(segundos / 86400);
    return `enviado hace ${dias} días`;
  }
}



  

  async enviarPrecio(DatosFletes: DatosFlete) {
    this.interaction.presentLoading;
    this.auth.stateUser().subscribe(res => {
      if (res) {
        const path = 'Fleteros';
        this.db.getDoc<UserF>(path, res.uid).subscribe(res2 => {
          const nuevoDato = DatosFletes;
          const rta22 = this.rta;
          // console.log('rta: ', rta22);
          const enlace = `PedirFlete/${DatosFletes.uid}/Pedidos/${DatosFletes.id}/Respuesta`;
          rta22.nombre = res2.nombre;
          rta22.apellido = res2.apellido;
          rta22.id = nuevoDato.uid
          rta22.idFletero = res.uid;
          this.db.createDoc<respuesta>(rta22, enlace, res.uid).then((_) => {
            this.interaction.presentToast('Enviado con exito');
            this.interaction.closeLoading;
            this.rta = {
              id: nuevoDato.id,
              idFletero: res.uid,
              nombre: '',
              apellido: '',
              precio: rta22.precio,
              mensaje: '',
               precioEnviado: true, // Agrega esta propiedad
              };
              const index = this.pasosFlete.findIndex(flete => flete.id === DatosFletes.id);
              if (index !== -1) {
                this.pasosFlete.splice(index, 1);
                this.fletesRespondidos.push(DatosFletes);
              }
          });
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
}