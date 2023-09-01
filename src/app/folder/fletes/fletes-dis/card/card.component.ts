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
  }

  ngOnInit() {
    this.fletesRespondidos = [];
    const usersCollectionPath = 'Usuarios';
    firebase.firestore().collection(usersCollectionPath).get()
      .then(querySnapshot => {
        const userIDs = querySnapshot.docs.map(doc => doc.id);
        console.log('userIDs: ', userIDs);
        
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
                return pasosFlete;
                
              })
              allFletes.push(...userFletes); // Agregar los pedidos del usuario actual al arreglo total
              this.cdr.detectChanges();
              console.log('Pedidos para el usuario con ID', uid,   userFletes);
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




  

  async enviarPrecio(DatosFletes: DatosFlete) {
    this.interaction.presentLoading;
    this.auth.stateUser().subscribe(res => {
      if (res) {
        const path = 'Fleteros';
        this.db.getDoc<UserF>(path, res.uid).subscribe(res2 => {
          const nuevoDato = DatosFletes;
          const rta22 = this.rta;
          console.log('rta: ', rta22);
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