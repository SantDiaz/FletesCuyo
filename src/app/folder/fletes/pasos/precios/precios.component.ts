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
  
  precios = []
  DatosF: UserF
  datosFl: DatosFlete
  datos: respuesta;
  rta2: respuesta;


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
    let datosFl: DatosFlete      
    this.auth.stateUser<UserU>().subscribe( res  => {

      if (res) {
       
        this.database.getAll(`PedirFlete3`).then(res =>{
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
        // this.login = false;
         this.router.navigate(['/login'])
        
      }   
 })

        

  }






  async getDatosFlete(DatosFletes: DatosFlete, rta: respuesta, user: UserF) {
    const nuevoDato = DatosFletes;
    const rtaa = rta;
    const users = user; 
    
    console.log(' resuid -> ',nuevoDato.id);
    // console.log(' useruid -> ',users.uid);
    
    
    const path = `PedirFlete3/${nuevoDato.id}/Respuesta`;
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











}


