import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserF, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';

@Component({
  selector: 'app-tabs-u',
  templateUrl: './tabs-u.component.html',
  styleUrls: ['./tabs-u.component.scss'],
})
export class TabsUComponent implements OnInit {


  login: boolean = false;
  rol: 'Usuario' | 'Fletero'| 'Admin' = null;

  constructor( private auth: AuthService,
               private router: Router,
               private interaction: InteractionService,
               private firestore: FirestoreService,
               
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

 ngOnInit() {}
  
PedirFlete(){
  this.router.navigate(['/fletes']);
}

Profile(){
  this.router.navigate(['/profile`']);
}

Home(){
  this.router.navigate(['/home`']);
}

  logout(){
      this.auth.logout();
  }

  getDatosUser(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<UserU>(path, id).subscribe( res => {
        console.log('datos -> ', res);
        if (res) {
          this.rol = res.perfil
        }
    })
  }

  getDatosFletero(uid: string) {
    const path = 'Fleteros';
    const id = uid;
    this.firestore.getDoc<UserF>(path, id).subscribe( res => {
        console.log('datos -> ', res);
        if (res) {
          this.rol = res.perfil
        }
    })
  }


}
