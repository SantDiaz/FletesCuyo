import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatosFlete, datosVehiculo, respuesta, UserF, UserU } from '../models/models';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { InteractionService } from '../services/interaction.service';
import { NuevoService } from '../services/nuevo.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  name: string;
  message = "putoss"
  loading: any;
  // datosF: Estado;
  fletes = [];
  DatosV: datosVehiculo;
  pasosFlete: DatosFlete[]  = [] 
  nuevoDato: DatosFlete;
  rta: respuesta={ 
    id: '',
    idFletero: '',
    nombre: '',
    apellido: '',
    precio: null, 
    mensaje: '',
  };


  pasosFlete2: DatosFlete={
    
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
    // respuesta: null,
    precio: null,
   };


  constructor(
    private auth: AuthService,
    private router: Router,
    private interacion : InteractionService,
    private db: FirestoreService,
    private database: NuevoService,
    public toastController: ToastController,
    private loadingCtrl: LoadingController, 
  ) {   }



  ngOnInit() {

    this.database.getAll('PedirFlete3').then(res =>{
      res.subscribe(resRef=>{
  
        this.fletes = resRef.map(pasosRef =>{
          let pasosFlete = pasosRef.payload.doc.data();
          pasosFlete['id'] = pasosRef.payload.doc.id;
          return pasosFlete;
          
        })
          console.log(this.fletes);
      })
    })
  }

  




alta(id){
  this.auth.stateUser<UserF>().subscribe( res  => {
if (res) {
  
  this.interacion.presentLoading;
  const data = this.rta;
  data.id = id;
  data.idFletero = res.uid;
  console.log('id recibido', id)
  
  console.log('idpoersona', res.uid)
const enlace = "Respuesta"
this.db.createDoc<respuesta>(data, enlace, data.id).then((_) =>{
  this.interacion.closeLoading;
  this.rta={
    id: data.id,
    idFletero: res.uid,
    nombre: '',
    apellido: '',
    precio: null, 
    mensaje: '',
   };
} );
}   
}) 
} 

  obtenerbyId(id){
    this.database.getById('PedirFlete3', id).then(res =>{
      res.subscribe(docRef=>{
        let precio = docRef.data();
        precio['id'] = docRef.id;
        console.log('esto--->', docRef.data());
      })
    })
  }
  
  
  
  // Guarda el precio
  async  editUser(DatosFletes: DatosFlete){
    console.log('fuuncio', DatosFletes);
    const res = await this.interacion.presentAlert('Alerta', '¿Seguro que deseas editar?');
    if (res){
      this.nuevoDato = DatosFletes;
        // const precio = this.nuevoDato.precio;
        const id = this.nuevoDato.id;
      const path = 'PedirFlete3';
        await this.db.updateDoc(path, id, DatosFletes);
        this.interacion.presentToast('Editado con exito');
      }
    }
  
  // editUser(DatosFletes: DatosFlete){
  //   console.log('fuuncio', DatosFletes);
  //   this.nuevoDato = DatosFletes;
  // }
  
  
  
  async  deleteUser(DatosFletes: DatosFlete){
    const res = await this.interacion.presentAlert('Alerta', '¿Seguro que deseas eliminar?');
    if (res){
      const path = 'PedirFlete3';
      await this.db.deleteDoc(path, DatosFletes.uid);
      this.interacion.presentToast('Eliminado con exito');
    }
  }
  
  
  
  
  
  
  


    cancel() {
      this.modal.dismiss(null, 'cancel');
    }
  
    confirm() {
      this.modal.dismiss(this.name, 'confirm');
    }
  
    onWillDismiss(event: Event) {
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
      if (ev.detail.role === 'confirm') {
        this.message = `Hello, ${ev.detail.data}!`;
      }
    }

}