import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserF, UserU } from './folder/models/models';
import { AuthService } from './folder/services/auth.service';
import { FirestoreService } from './folder/services/firestore.service';
import { InteractionService } from './folder/services/interaction.service';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  login: boolean = false;
  rol: 'Usuario' | 'Fletero'| 'Admin' = null;

  constructor( private auth: AuthService,
               private router: Router,
               private interaction: InteractionService,
               private firestore: FirestoreService,
              //  private afMessaging: AngularFireMessaging,
               
    ) {      
      this.auth.stateUser().subscribe( res => {
      if (res) {
          //  console.log('está logeado');
           this.login = true;
           this.getDatosUser(res.uid);
           this.getDatosFletero(res.uid);
      } else {
        console.log('no está logeado');
        this.login = false;
      //  this.router.navigate(['/login'])
        
      }   
 })
}

ngOnInit() {
  // this.afMessaging.requestToken.subscribe(
  //   (token) => {
  //     console.log('Token:', token);
  //     // Envía este token a tu servidor o Firebase para registrar el dispositivo
  //   },
  //   (error) => {
  //     console.error('Error al obtener el token:', error);
  //   }
  // );
}

  logout(){
      this.auth.logout();
  }

  getDatosUser(uid: string) {
    const path = 'Usuarios';
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
}
