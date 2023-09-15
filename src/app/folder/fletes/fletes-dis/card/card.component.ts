import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatosFlete, datosVehiculo, respuesta, UserF, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { NuevoService } from 'src/app/folder/services/nuevo.service';
import 'firebase/firestore';
import { Inject } from '@angular/core';
import firebase from 'firebase/compat/app';
import { DOCUMENT } from '@angular/common';
import { MapboxComponent } from '../../../mapbox/mapbox.component'; // Ajusta la ruta a tu ubicación real
import { ModalController } from '@ionic/angular';
import { VerRutaComponent } from 'src/app/folder/mapbox/ver-ruta/ver-ruta.component';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @HostListener('window:DOMContentLoaded', ['$event'])
  @ViewChild(MapboxComponent, { static: false }) mapboxComponent: MapboxComponent; // Agrega esta línea
  onDOMContentLoaded(event: Event): void {
    this.checkHiddenOrders();
  }

  hiddenOrders: string[] = [];
  login: boolean = false;
  rol: 'Usuario' | 'Fletero' | 'Admin' = null;
  loading: any;
  fletes: any = [];
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
    uid: '',
    id: '',
    precio: null,
    startCoordinates: {
      latitude: null,
      longitude: null,
  },
  endCoordinatesP: {
    latitude: null,
    longitude: null,
}
  };
  private miIdDeFletero: string = ''; // Declara la variable para almacenar el ID del fletero actual

  rta: respuesta = {
    id: '',
    idFletero: '',
    nombre: '',
    apellido: '',
    precio: null,
    telefono: null,
    mensaje: '',
    precioEnviado: false, // Agrega esta propiedad
  };
  pasosFlete: DatosFlete[] = [];
  selectedSegment = 'seccion1'; // Segmento seleccionado por defecto
  fletesRespondidos: DatosFlete[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private auth: AuthService,
    private router: Router,
    private interaction: InteractionService,
    private db: FirestoreService,
    private database: NuevoService,
    public toastController: ToastController,
    private loadingCtrl: LoadingController,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private modal: ModalController,
    ) {
      // Suscríbete al estado del usuario para obtener el ID del fletero cuando inicie sesión
      this.auth.stateUser().subscribe((res) => {
        if (res) {
          // Asigna el ID del fletero actual
          this.miIdDeFletero = res.uid;
        }
      });
    }
    ngOnInit() {
      this.fletesRespondidos = [];
      this.checkHiddenOrders()
      // Obtiene los pedidos ocultos desde localStorage
    
      const usersCollectionPath = 'Usuarios';
      this.fletes = []; // Vacía el arreglo de pedidos antes de cargar los nuevos
    
      // Carga solo los pedidos que no están en la lista de ocultos
      firebase
        .firestore()
        .collection(usersCollectionPath)
        .get()
        .then((querySnapshot) => {
          const userIDs = querySnapshot.docs.map((doc) => doc.id);
    
          const allFletes = []; // Arreglo que almacenará todos los pedidos de todos los usuarios
          userIDs.forEach((uid) => {
            const pedidosCollectionPath = `PedirFlete/${uid}/Pedidos/`;
            this.database
              .getAll(pedidosCollectionPath)
              .then((res) => {
                res.subscribe((resRef) => {
                  const userFletes = resRef.map((pasosRef) => {
                    let pasosFlete = pasosRef.payload.doc.data() as DatosFlete;
                    pasosFlete['id'] = pasosRef.payload.doc.id;
    
                    // Verifica si el pedido está en la lista de ocultos
                      allFletes.push(pasosFlete); // Agregar el pedido si no está oculto
                    return pasosFlete;
                  });
                  this.cdr.detectChanges(); // Actualiza la vista de Angular después de cargar los datos
                });
              })
              .catch((error) => {
                console.error(`Error fetching pedidos for user with ID ${uid}:`, error);
              });
          });
          this.fletes = allFletes; // Asignar todos los pedidos al arreglo fletes al final
        })
        .catch((error) => {
          console.error('Error fetching user IDs:', error);
        });
    }
    
    
    
    async precioInputChanged(pedidoId: string, precioEnviado: boolean, DatosFletes: DatosFlete) {
      if (!precioEnviado) {
        console.log('DatosFletes:', DatosFletes);
        console.log('pedidoId:', pedidoId);
        // Verifica si el pedido aún no tiene un precio enviado por el fletero actual
        const precio = prompt('Ingrese el precio:');
        if (precio !== null) {
          // Convierte el precio a un número (si no está en formato numérico)
          const precioNumerico = Number(precio);
          document.cookie = `pedido${pedidoId}=${this.miIdDeFletero}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          const index = this.fletes.findIndex((flete) => flete.id === pedidoId);
          if (index !== -1) {
            this.fletes.splice(index, 1);
            if (this.fletes[index]) {
              this.fletes[index].precio = precioNumerico;
              this.fletes[index].precioEnviado = true;
            }
            // Establece una cookie para registrar que este fletero ha enviado un precio para este pedido
            document.cookie = `pedido${pedidoId}=${this.miIdDeFletero}`;
            // Actualiza la propiedad precio de rta
            this.rta.precio = precioNumerico;
          const path = 'Fleteros';
          this.db.getDoc<UserF>(path, this.miIdDeFletero).subscribe((res2) => {
            const nuevoDato = DatosFletes;
            const rta22 = this.rta;
            const enlace = `PedirFlete/${DatosFletes.uid}/Pedidos/${DatosFletes.id}/Respuesta`;
            rta22.nombre = res2.nombre;
            rta22.apellido = res2.apellido;
            rta22.telefono = res2.telefono;
            rta22.id = nuevoDato.uid;
            rta22.idFletero = this.miIdDeFletero;
            this.db.createDoc<respuesta>(rta22, enlace, this.miIdDeFletero).then((_) => {
              this.interaction.presentToast('Enviado con éxito');
              this.interaction.closeLoading;
              this.rta = {
                id: nuevoDato.id,
                idFletero: this.miIdDeFletero,
                nombre: '',
                apellido: '',
                telefono: rta22.telefono,
                precio: DatosFletes.precio, //aqui quiero guardar el precio
                mensaje: '',
                precioEnviado: true, // Agrega esta propiedad
              };
      });
    });
  
          // Aquí puedes enviar la información actualizada a tu backend si es necesario
  
          // Oculta el pedido solo para el fletero actual
          const fleteroActualIndex = this.fletes.findIndex((flete) => flete.id === pedidoId);
          if (fleteroActualIndex !== -1) {
            this.fletes.splice(fleteroActualIndex, 1);
          }
        }
      }
    }
  }
  
  checkHiddenOrders() {
    // Verifica si hay IDs de pedidos ocultos en localStorage
    const hiddenOrdersString = localStorage.getItem('hiddenOrders');
    if (hiddenOrdersString) {
      const hiddenOrders = JSON.parse(hiddenOrdersString);

      // Recorre this.fletes y oculta los pedidos correspondientes
      this.fletes.forEach((datos) => {
        if (hiddenOrders.includes(datos.id)) {
          datos.oculto = true;
        } else {
          datos.oculto = false;
        }
      });

      // También puedes ocultar los elementos HTML según el estado de datos.oculto
      this.cdr.detectChanges();
    } else {
      // Si no hay IDs de pedidos ocultos en localStorage, utiliza la lógica anterior basada en cookies
      const cookies = document.cookie.split(';');
      this.hiddenOrders = cookies
        .filter((cookie) => cookie.trim().startsWith('pedido'))
        .map((cookie) => {
          console.log('Cookies:', document.cookie);
          const [key, value] = cookie.trim().split('=');
          return key.substring(6); // Obtiene el ID del pedido de la cookie
        });

      // Recorre this.fletes y oculta los pedidos correspondientes
      this.fletes.forEach((datos) => {
        if (this.hiddenOrders.includes(datos.id)) {
          console.log('Pedidos ocultos:', this.hiddenOrders);
          datos.oculto = true;
        } else {
          datos.oculto = false;
        }
      });

      // Actualiza el localStorage con los pedidos ocultos
      localStorage.setItem('hiddenOrders', JSON.stringify(this.hiddenOrders));

      // También puedes ocultar los elementos HTML según el estado de datos.oculto
      this.cdr.detectChanges();
    }
  }

  
  
  
  
  
 async mostrarRuta(DatosFletes: DatosFlete) {


    
    if (DatosFletes.startCoordinates && DatosFletes.endCoordinatesP) {
      const startCoordinates = DatosFletes.startCoordinates;
      const endCoordinates = DatosFletes.endCoordinatesP;
  
      const modal = await this.modal.create({
        component: VerRutaComponent,
        componentProps: {
          datos: { startCoordinates, endCoordinates }, // Pasa las coordenadas al modal
          cardComponentRef: this, // Pasa una referencia al componente actual
        },
      });
    
      // modal.onDidDismiss().then((result) => {
      //   if (result.role === 'ubicacionesSeleccionadas' && result.data) {
      //     // Los datos de ubicaciones seleccionadas están disponibles en result.data
      //     const ubicaciones = result.data;
      //     // Puedes manejar las ubicaciones como desees en este componente
      //     console.log('Ubicaciones seleccionadas:', ubicaciones);
      //   }
      // });
    
      await modal.present();





      // Ahora tienes las coordenadas de inicio y fin, puedes usarlas para mostrar la ruta
      console.log('Coordenadas de inicio:', startCoordinates);
      console.log('Coordenadas de fin:', endCoordinates);
  
      // Aquí puedes llamar a tu lógica para mostrar la ruta, por ejemplo, utilizando Mapbox o cualquier otra biblioteca de mapas
    } else {
      console.error('Las coordenadas de inicio o fin no están disponibles en los datos del pedido.');
    }
  }
  

  async presentToast(mensaje: string, tiempo: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo,
      position: 'middle',
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
    
      //   async enviarPrecio(DatosFletes: DatosFlete) {
      //     this.interaction.presentLoading;
      //   if (this.miIdDeFletero) {
      //     const path = 'Fleteros';
      //     this.db.getDoc<UserF>(path, this.miIdDeFletero).subscribe((res2) => {
      //       const nuevoDato = DatosFletes;
      //       const rta22 = this.rta;
      //       const enlace = `PedirFlete/${DatosFletes.uid}/Pedidos/${DatosFletes.id}/Respuesta`;
      //       rta22.nombre = res2.nombre;
      //       rta22.apellido = res2.apellido;
      //       rta22.id = nuevoDato.uid;
      //       rta22.idFletero = this.miIdDeFletero;
      //       this.db.createDoc<respuesta>(rta22, enlace, this.miIdDeFletero).then((_) => {
      //         this.interaction.presentToast('Enviado con éxito');
      //         this.interaction.closeLoading;
      //         this.rta = {
      //           id: nuevoDato.id,
      //           idFletero: this.miIdDeFletero,
      //           nombre: '',
      //           apellido: '',
      //           precio: rta22.precio,
      //           mensaje: '',
      //           precioEnviado: true, // Agrega esta propiedad
      //         };
      //         const index = this.pasosFlete.findIndex((flete) => flete.id === DatosFletes.id);
      //         if (index !== -1) {
      //           this.pasosFlete.splice(index, 1);
      //           this.fletesRespondidos.push(DatosFletes);
                
      //         }
    
      //         // Ahora puedes usar this.miIdDeFletero donde sea necesario
      //         console.log('ID del fletero actual:', this.miIdDeFletero);
      //       });
      //     });
      //   }
      // }

