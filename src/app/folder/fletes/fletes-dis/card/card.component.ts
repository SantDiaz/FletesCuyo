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
  private pedidoId: string; // Agrega esta línea
  login: boolean = false;
  rol: 'Usuario' | 'Fletero' | 'Admin' = null;
  loading: any;
  fletes : any[] = [] ;
  pasosFlete: DatosFlete[] = []
  datoss: UserU;
  DatosV: datosVehiculo;
  nuevoDato: DatosFlete;
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

  rta2: respuesta;

  rta: respuesta = {
    id: '',
    idFletero: '',
    nombre: '',
    apellido: '',
    precio: null,
    mensaje: '',
  };

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
  ) { }


  ngOnInit() {
    this.pedidoId = this.route.snapshot.paramMap.get('pedidoId');
    const usersCollectionPath = 'Usuarios';
    
    firebase.firestore().collection(usersCollectionPath).get()
      .then(querySnapshot => {
        const userIDs = querySnapshot.docs.map(doc => doc.id);
        console.log('userIDs: ', userIDs);
        
        // Ahora puedes usar los IDs de los usuarios para acceder a sus pedidos
        userIDs.forEach(uid => {
          const pedidosCollectionPath = `PedirFlete/${uid}/Pedidos/`;
          console.log('enlace', pedidosCollectionPath);
    
          this.database.getAll(pedidosCollectionPath).then(res =>{
            res.subscribe(resRef=>{
              this.fletes = resRef.map(pasosRef =>{
                let pasosFlete = pasosRef.payload.doc.data();
                pasosFlete['id'] = pasosRef.payload.doc.id;
                return pasosFlete;

              
              })
              this.cdr.detectChanges();
              console.log('Pedidos para el usuario con ID', uid, this.fletes);
            })

         

            })
            .catch(error => {
              console.error(`Error fetching pedidos for user with ID ${uid}:`, error);
            });
        });
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
      if (res && this.login == true) {
        const path = 'Fleteros';
        this.db.getDoc<UserF>(path, res.uid).subscribe(res2 => {
          const nuevoDato = DatosFletes;
          const rta22 = this.rta;
          console.log('rta: ', rta22);
          const enlace = `PedirFlete3/${nuevoDato.id}/Respuesta`;
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
            };
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
