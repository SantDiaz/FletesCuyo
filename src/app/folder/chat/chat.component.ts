import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatosFlete, datosVehiculo, UserU } from '../models/models';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { InteractionService } from '../services/interaction.service';
import { NuevoService } from '../services/nuevo.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  
  loading: any;
  fletes = [];
  // DatosU: UserU[];
  DatosV: datosVehiculo;
  // DatosU: DatosFlete;
  pasosFlete: DatosFlete[]  = [] 
  nuevoDato: DatosFlete;
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


  
  
  obtenerbyId(id){
    this.database.getById('PedirFlete3', id).then(res =>{
      res.subscribe(docRef=>{
        let precio = docRef.data();
        precio['id'] = docRef.id;
        console.log('esto--->', docRef.data());
      })
    })
  }
  
  modificar(id){
    this.database.update('PedirFlete3', id, this.pasosFlete2).then(res =>{
      alert("se modifico");
      console.log('modificas esto', res);
      
    }).catch (err =>{
      console.log('error al modificar', err);
    })
  }
  
  
  
  
  // }
  
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    alta(){
      this.database.create('PedirFlete3', this.fletes).then(res =>{
        console.log("ress", res);
      }).catch (err =>{
        console.log('errar', err);
        
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