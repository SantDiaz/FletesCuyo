import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserF, UserU } from '../models/models';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { InteractionService } from '../services/interaction.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {



  constructor(private router: Router) { }

  ngOnInit() {}
  
//   getDatosUser(uid: string) {
//     const path = 'Usuarios';
//     const id = uid;
//     this.firestore.getDoc<UserU>(path, id).subscribe( res => {
//         // console.log('datos -> ', res);
//         if (res) {
//           this.rol = res.perfil
//         }
//     })
//   }

//   getDatosFletero(uid: string) {
//     const path = 'Fleteros';
//     const id = uid;
//     this.firestore.getDoc<UserF>(path, id).subscribe( res => {
//         console.log('datos -> ', res);
//         if (res) {
//           this.rol = res.perfil
//         }
//     })
// }



  user(){
    this.router.navigate(['/formUser1']);
  }

  fletero(){
    this.router.navigate(['/formF1']);
  }

}