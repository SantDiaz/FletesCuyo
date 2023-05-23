import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatosFlete, UserF, UserU, datosVehiculo, respuesta } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { FleteroServiceService } from 'src/app/folder/services/fletero-service.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { NuevoService } from 'src/app/folder/services/nuevo.service';
import { CLIENT_RENEG_LIMIT } from 'tls';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss'],
})
export class PreciosComponent implements OnInit {

  login: boolean = false;
  rol: 'Usuario' | 'Fletero'| 'Admin' = null;
  precios = []
  precios2 = []
  DatosF: UserF
  datosFl: DatosFlete
  datos2: DatosFlete
  datos: respuesta;
  rta2: respuesta;
  isModalOpen = false;
  // enlacesWhatsApp:string;
  enlacesWhatsApp:string[];
  fleteros: UserF[];
  fleteroSeleccionadoId: string;

  constructor(
          private auth: AuthService,
          private router: Router,
          private authS: AuthService,
          private interacion : InteractionService,
          private db: FirestoreService,
          private database: NuevoService,
          public toastController: ToastController,
          private loadingCtrl: LoadingController, 
          private fleteroService: FleteroServiceService

  ) { }

  ngOnInit() {

    this.fleteroService.getFleteros().subscribe((fleteros: UserF[]) => {
      this.enlacesWhatsApp = this.generateWhatsAppLink(fleteros, '+54');
      console.log('Enlaces de WhatsApp:', this.enlacesWhatsApp);
    });
    this.auth.stateUser<UserU>().subscribe( res  => {

      if (res) {
        this.login = true;
        this.database.getAll(`PedirFlete3/${res.uid}/Respuesta`).then(res =>{
          res.subscribe(resRef=>{
            this.precios = resRef.map(pasosRef =>{
              let pasosFlete = pasosRef.payload.doc.data();
              pasosFlete['id'] = pasosRef.payload.doc.id;
              return pasosFlete;
            })
            console.log(this.precios);
          })
      }) 
      } else {
        this.login = false;
         this.router.navigate(['/login'])
      }   
 })
  }

  
  getDatosFf(rta: respuesta) {
    const path = 'Fleteros';
    const id = rta.idFletero;
    this.db.getDoc<UserF>(path, id).subscribe( res => {
      if (res ) {
        this.DatosF = res;
        const fleteroId = res.uid
        this.openWhatsApp(fleteroId)
        }
    })
  }

  openWhatsApp(fleteroId: string) {
   
    console.log('Fletero ID:', fleteroId);
    const path = 'Fleteros'
    this.db.getDoc<UserF>(path, fleteroId).subscribe( res => {
      if (res ) {
        // this.DatosF = res;
        console.log("resultado", res)
    if (fleteroId) {
      const enlaceWhatsApp = this.enlacesWhatsApp.find(link => link.includes(res.telefono));
      console.log('Enlace de WhatsApp encontrado:', enlaceWhatsApp);
      
      if (enlaceWhatsApp) {
        window.open(enlaceWhatsApp, '_blank');
      } else {
        console.log('El enlace de WhatsApp no está disponible para el fletero seleccionado.');
      }
    } else {
      console.log('El objeto fletero es inválido o no tiene una propiedad uid definida.');
    }
  }
})
  }
  
  obtenerEnlaces() {
    this.fleteroService.getFleteros().subscribe((fleteros: UserF[]) => {
      // fleteros
      this.enlacesWhatsApp = this.generateWhatsAppLink(fleteros, '+54');
      console.log('Enlaces de WhatsApp:', this.enlacesWhatsApp);
    });
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





verPedidos(isOpen: boolean, precios2){
 
  this.isModalOpen = isOpen;
  this.auth.stateUser<UserU>().subscribe( res  => {
    const path = `PedirFlete3`
    if (res) {
      this.db.getDoc<DatosFlete>(path, res.uid).subscribe(res2 => { 
        this.datos2 = res2
        console.log('pedido:', res2);
      })
    } 
  })

}   




  async getDatosFlete(DatosFletes: DatosFlete) {
    const nuevoDato = DatosFletes;
    console.log(' resuid -> ',nuevoDato.id);
    const path = `PedirFlete3/`;
    this.db.getCollection<respuesta>(path).subscribe( res => {
      if (res ) {
        this.database.getAll(`PedirFlete3/${nuevoDato.id}/Respuesta/`).then(res2 =>{
          res2.subscribe(resRef=>{
                 console.log(' respnde2 -> ',res2);
            this.precios = resRef.map(pasosRef =>{
              let pasosFlete = pasosRef.payload.doc.data();
              pasosFlete['id'] = pasosRef.payload.doc.id;
              return pasosFlete;
            })
            console.log(this.precios);
          })
        // })
      }) 
        }
        else{
          console.log('Tiene errores -> ');
        }
    })
    return this.getDatosFlete;
  }

  cerrar(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }






}

