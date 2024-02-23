import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserF, UserU, datosVehiculo } from '../models/models';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { InteractionService } from '../services/interaction.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { NuevoService } from '../services/nuevo.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  
  login: boolean = false;
  rol: 'Usuario' | 'Fletero'| 'Admin' = null;
//ADMIN
menuVisible: boolean = false;
itemsU = [];
itemsF = [];
DatoVehicular: datosVehiculo;
valueSelected:string = "1";
  constructor( private auth: AuthService,
               private router: Router,
               private interaction: InteractionService,
               private firestore: FirestoreService,
              private database: NuevoService,

               
    ) {      this.auth.stateUser().subscribe( res => {
      if (res) {
           console.log('está logeado');
           this.login = true;
           this.getDatosUser(res.uid);
           this.getDatosFletero(res.uid);
      } else {
        console.log('no está logeado');
        this.login = false;
       this.router.navigate(['/login'])
        
      }   
 })}

  ngOnInit() {

  }
  
  getDatosUser(uid: string) {
    const path = `Usuarios/${uid}/DatosPersonales`;
    const id = uid;
    this.firestore.getDoc<UserU>(path, id).subscribe( res => {
        // console.log('datos -> ', res);
        if (res) {
          this.rol = res.perfil
        }
    })
  }

  getDatosFletero(uid: string) {
    const path = 'Fleteros';
    const id = uid;
    this.firestore.getDoc<UserF>(path, id).subscribe( res => {
        // console.log('datos -> ', res);
        if (res) {
          this.rol = res.perfil
        }
    })
}



//ADMIN


public alertButtons = ['OK'];

getUser(){
    this.database.getAll(`Usuarios`).then(res =>{
      res.subscribe(resRef=>{
         
        this.itemsU = resRef.map(pasosRef =>{
          let pasosFlete = pasosRef.payload.doc.data();
          pasosFlete['id'] = pasosRef.payload.doc.id;
          pasosFlete['showOptions'] = false; // Inicializar showOptions en false
          return pasosFlete;
        })
        console.log(this.itemsU);
      })
    })
  }


getFletero(){
  this.database.getAll(`Fleteros`).then(res =>{
    res.subscribe(resRef=>{
       
      this.itemsF = resRef.map(pasosRef =>{
        let pasosFlete = pasosRef.payload.doc.data();
        pasosFlete['id'] = pasosRef.payload.doc.id;
        pasosFlete['showOptions'] = false; // Inicializar showOptions en false
        return pasosFlete;
      })
      console.log(this.itemsF);
    })
  })
}

segmentChanged(event: CustomEvent){
  this.valueSelected = event.detail.value;
  console.log(this.valueSelected);
}


onIonInfinite(ev) {
  this.generateItems();
  setTimeout(() => {
    (ev as InfiniteScrollCustomEvent).target.complete();
  }, 500);
}

private generateItems() {
  const count = this.itemsU.length + 1;
  for (let i = 0; i < 50; i++) {
    this.itemsU.push(`Item ${count + i}`);
  }
}

showOptionsMenu(itemFlete: any) {
  itemFlete.showOptions = !itemFlete.showOptions; // Alternar el estado de visualización
}
}
