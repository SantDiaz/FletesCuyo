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
import { FleteroServiceService } from '../services/fletero-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  registerU: UserU = {
    uid: null,
    nombre: null,
    apellido: null,
    dni: null,
    edad: null,
    domicilio: null,
    telefono: null,
    image: null,
    email: null,
    password: null,
    perfil:  'Usuario',
  }

  // name: string;
  // message = "putoss"
  // loading: any;
  // // datosF: Estado;
  // fletes = [];
  // DatosV: datosVehiculo;
  // pasosFlete: DatosFlete[]  = [] 
  // nuevoDato: DatosFlete;
  // rta: respuesta={ 
  //   id: '',
  //   idFletero: '',
  //   nombre: '',
  //   apellido: '',
  //   precio: null, 
  //   mensaje: '',
  // };


  // pasosFlete2: DatosFlete={
  //   nombre: '',
  //   apellido: '',
  //   fecha: null,
  //   hora: null,
  //   minutos: null,
  //   uDesde: '',
  //   uHasta: '',
  //   cargamento: '',
  //   tipoVehiculo:  null,
  //   ayudantes:  null ,
  //   uid:  "" ,
  //   id: '',
  //   // respuesta: null,
  //   precio: null,
  //  };

  enlacesWhatsApp: string[];
  constructor(
    private auth: AuthService,
    private router: Router,
    private interacion : InteractionService,
    private db: FirestoreService,
    private database: NuevoService,
    public toastController: ToastController,
    private loadingCtrl: LoadingController, 
    private fleteroService: FleteroServiceService
  ) {   }


  ngOnInit() {
    this.obtenerEnlaces();
  }

  obtenerEnlaces() {
    this.fleteroService.getFleteros().subscribe((fleteros: UserF[]) => {
      // fleteros
      this.enlacesWhatsApp = this.generateWhatsAppLink(fleteros, '+54');
      console.log('Enlaces de WhatsApp:', this.enlacesWhatsApp);
    });
  }

  openWhatsApp(whatsappLink: string) {
    window.open(whatsappLink, '_blank');
  }
  
 generateWhatsAppLink(fleteros: UserF[], countryCode: string) {
  const message = 'Hola, estoy interesado en solicitar un flete.'; // Mensaje predeterminado

  const formattedMessage = encodeURIComponent(message); // Codifica el mensaje para asegurar caracteres especiales
  
  const whatsappLinks = fleteros.map(fletero => {
    const formattedPhoneNumber = fletero.telefono.replace(/\s/g, ''); // Elimina espacios en blanco del número de teléfono
    const phoneNumberWithPrefix = `${countryCode}${formattedPhoneNumber}`;
    return `https://wa.me/${phoneNumberWithPrefix}?text=${formattedMessage}`;
  });

  return whatsappLinks;
}



// alta(id){
//   this.auth.stateUser<UserF>().subscribe( res  => {
// if (res) {
  
//   this.interacion.presentLoading;
//   const data = this.rta;
//   data.id = id;
//   data.idFletero = res.uid;
//   console.log('id recibido', id)
  
//   console.log('idpoersona', res.uid)
// const enlace = "Respuesta"
// this.db.createDoc<respuesta>(data, enlace, data.id).then((_) =>{
//   this.interacion.closeLoading;
//   this.rta={
//     id: data.id,
//     idFletero: res.uid,
//     nombre: '',
//     apellido: '',
//     precio: null, 
//     mensaje: '',
//    };
// } );
// }   
// }) 
// } 
// z
//   obtenerbyId(id){
//     this.database.getById('PedirFlete3', id).then(res =>{
//       res.subscribe(docRef=>{
//         let precio = docRef.data();
//         precio['id'] = docRef.id;
//         console.log('esto--->', docRef.data());
//       })
//     })
//   }
  
  
  
//   // Guarda el precio
//   async  editUser(DatosFletes: DatosFlete){
//     console.log('fuuncio', DatosFletes);
//     const res = await this.interacion.presentAlert('Alerta', '¿Seguro que deseas editar?');
//     if (res){
//       this.nuevoDato = DatosFletes;
//         // const precio = this.nuevoDato.precio;
//         const id = this.nuevoDato.id;
//       const path = 'PedirFlete3';
//         await this.db.updateDoc(path, id, DatosFletes);
//         this.interacion.presentToast('Editado con exito');
//       }
//     }
  
//   // editUser(DatosFletes: DatosFlete){
//   //   console.log('fuuncio', DatosFletes);
//   //   this.nuevoDato = DatosFletes;
//   // }
  
  
  
//   async  deleteUser(DatosFletes: DatosFlete){
//     const res = await this.interacion.presentAlert('Alerta', '¿Seguro que deseas eliminar?');
//     if (res){
//       const path = 'PedirFlete3';
//       await this.db.deleteDoc(path, DatosFletes.uid);
//       this.interacion.presentToast('Eliminado con exito');
//     }
//   }
  
  
  
  
  
  
  


//     cancel() {
//       this.modal.dismiss(null, 'cancel');
//     }
  
//     confirm() {
//       this.modal.dismiss(this.name, 'confirm');
//     }
  
//     onWillDismiss(event: Event) {
//       const ev = event as CustomEvent<OverlayEventDetail<string>>;
//       if (ev.detail.role === 'confirm') {
//         this.message = `Hello, ${ev.detail.data}!`;
//       }
//     }

}