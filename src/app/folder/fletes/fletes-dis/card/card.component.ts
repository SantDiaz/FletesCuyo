import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatosFlete, datosVehiculo, respuesta, UserF, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { NuevoService } from 'src/app/folder/services/nuevo.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  login: boolean = false;
  rol: 'Usuario' | 'Fletero'| 'Admin' = null;
  loading: any;
  fletes = [];
  datoss : UserU;
  DatosV: datosVehiculo;
  pasosFlete: DatosFlete[]  = [] 
  nuevoDato: DatosFlete;
  pasosFlete2: DatosFlete={
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
    uid:  "" ,
    id: '',
    precio: null,
  };
  
  
  rta2: respuesta;


   rta: respuesta={ 
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
    private interaction : InteractionService,
    private db: FirestoreService,
    private database: NuevoService,
    public toastController: ToastController,
    private loadingCtrl: LoadingController, 
  ) {   }

  // const path = 'Fleteros';
  // this.db.getDoc<UserF>(path, res.uid).subscribe( res2 => {
  //   console.log("res", res);
    
  // }


    ngOnInit() {

      this.auth.stateUser<UserU>().subscribe( res => {
        this.login = true;
    this.database.getAll(`PedirFlete3`).then(res =>{
      res.subscribe(resRef=>{
         
        this.fletes = resRef.map(pasosRef =>{
          let pasosFlete = pasosRef.payload.doc.data();
          pasosFlete['id'] = pasosRef.payload.doc.id;
          return pasosFlete;
        })
        console.log(this.fletes);
      })
    })
  }) 
  
      }

  
  
  async  editUser(DatosFletes: DatosFlete){
    this.interaction.presentLoading;
    this.auth.stateUser().subscribe( res => {

      if (res && this.login==true) {
        const path = 'Fleteros';
        this.db.getDoc<UserF>(path, res.uid).subscribe( res2 => {

          const nuevoDato = DatosFletes;
          const rta22 = this.rta; 
          // console.log('id Fletero:', res.uid)
          // console.log('id Usuario: ', nuevoDato.id);
          console.log('rta: ', rta22);
        const enlace = `PedirFlete3/${nuevoDato.id}/Respuesta`;
        rta22.nombre = res2.nombre;
        rta22.apellido = res2.apellido;
        rta22.id = nuevoDato.uid
        rta22.idFletero = res.uid;
      
      this.db.createDoc<respuesta>(rta22, enlace,  res.uid ).then((_) =>{
        this.interaction.presentToast('Enviado con exito');
        this.interaction.closeLoading;
            this.rta={
              id: nuevoDato.id,
              idFletero: res.uid,
              nombre:  '', 
              apellido:  '', 
              precio: rta22.precio, 
              // precio: null,
              mensaje: '',
        };
        } );
      });
    } 
  })
}



  
async  deleteUser(DatosFletes: DatosFlete){
  const res = await this.interaction.presentAlert('Alerta', '¿Seguro que deseas eliminar?');
  if (res){
    const path = 'PedirFlete3';
    await this.db.deleteDoc(path, DatosFletes.uid);
    this.interaction.presentToast('Eliminado con exito');
  }
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



// obtenerbyId(id){
//   this.database.getById('PedirFlete3', id).then(res =>{
//     res.subscribe(docRef=>{
//       let precio = docRef.data();
//       precio['id'] = docRef.id;
//       // console.log('esto--->', docRef.data());
//     })
//   })
// }


}
