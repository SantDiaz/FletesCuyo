// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
// import { InteractionService } from '../services/interaction.service';
// import { FirestoreService } from '../services/firestore.service';
// import { NuevoService } from '../services/nuevo.service';
// import { UserU, datosVehiculo } from '../models/models';
// import { InfiniteScrollCustomEvent } from '@ionic/angular';

// @Component({
//   selector: 'app-admin',
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.scss'],
// })
// export class AdminComponent implements OnInit {
//   itemsU = [];
//   itemsF = [];
//   DatoVehicular: datosVehiculo;
//   valueSelected:string = "1";

//     constructor(
//               private auth: AuthService,
//               private router: Router,
//               private interaction : InteractionService,
//               private db: FirestoreService,
//               private database: NuevoService,
//   ) { }

//   ngOnInit() {
//     this.getUser();
//     this.auth.stateUser<UserU>().subscribe( res => {
//       // this.login = true;
//       // this.generateItems();
// }) 
//   }


//   public alertButtons = ['OK'];

//   getUser(){
//     this.database.getAll(`Usuarios`).then(res =>{
//       res.subscribe(resRef=>{
         
//         this.itemsU = resRef.map(pasosRef =>{
//           let pasosFlete = pasosRef.payload.doc.data();
//           pasosFlete['id'] = pasosRef.payload.doc.id;
//           return pasosFlete;
//         })
//         console.log(this.itemsU);
//       })
//     })
//   }


//   getFletero(){
//     this.database.getAll(`Fleteros`).then(res =>{
//       res.subscribe(resRef=>{
         
//         this.itemsF = resRef.map(pasosRef =>{
//           let pasosFlete = pasosRef.payload.doc.data();
//           pasosFlete['id'] = pasosRef.payload.doc.id;
//           return pasosFlete;
//         })
//         console.log(this.itemsF);
//       })
//     })
//   }
  
//   segmentChanged(event: CustomEvent){
//     this.valueSelected = event.detail.value;
//     console.log(this.valueSelected);
//   }


//   onIonInfinite(ev) {
//     this.generateItems();
//     setTimeout(() => {
//       (ev as InfiniteScrollCustomEvent).target.complete();
//     }, 500);
//   }

//   private generateItems() {
//     const count = this.itemsU.length + 1;
//     for (let i = 0; i < 50; i++) {
//       this.itemsU.push(`Item ${count + i}`);
//     }
//   }
  
// }
