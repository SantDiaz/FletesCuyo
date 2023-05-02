import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatosFlete, UserF, UserU, datosVehiculo, respuesta } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { NuevoService } from 'src/app/folder/services/nuevo.service';

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

  constructor(
          private auth: AuthService,
          private router: Router,
          private authS: AuthService,
          private interacion : InteractionService,
          private db: FirestoreService,
          private database: NuevoService,
          public toastController: ToastController,
          private loadingCtrl: LoadingController, 
  ) { }

  ngOnInit() {

    

  
    this.auth.stateUser<UserU>().subscribe( res  => {

      if (res) {
        // this.verPedidos(res.uid, this.isModalOpen)
        this.login = true;
        this.database.getAll(`PedirFlete3/${res.uid}/Respuesta`).then(res =>{
          res.subscribe(resRef=>{
            this.precios = resRef.map(pasosRef =>{
              let pasosFlete = pasosRef.payload.doc.data();
              pasosFlete['id'] = pasosRef.payload.doc.id;
              return pasosFlete;
              // this.verPedidos(false, this.precios);
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


// verPedidos(uid: string, isOpen: boolean) {
//   this.isModalOpen = isOpen;
//   const path = 'PedirFlete3';
//   const id = uid;
  
//   this.db.getDoc<DatosFlete>(path, id).subscribe( res => {
//     if (res ) {
//       this.datos2 = res;
//       console.log('id personal -> ', uid);
//       console.log('trae esto-->', res );
//       }
//       else{
//         console.log('Tiene errores -> ');
//       }
//   })
// }


  async getDatosFlete(DatosFletes: DatosFlete) {
    const nuevoDato = DatosFletes;

    
    console.log(' resuid -> ',nuevoDato.id);
    // console.log(' useruid -> ',users.uid);
    
    
    const path = `PedirFlete3/`;
    this.db.getCollection<respuesta>(path).subscribe( res => {
      if (res ) {
        //  res = this.precios ;
        // console.log(' respnde -> ',res);
        // //  this.DatosF= res;

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

