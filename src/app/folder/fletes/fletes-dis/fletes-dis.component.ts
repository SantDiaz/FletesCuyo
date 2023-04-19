import { Component, OnInit } from '@angular/core';
import { DatosFlete, UserF } from '../../models/models';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-fletes-dis',
  templateUrl: './fletes-dis.component.html',
  styleUrls: ['./fletes-dis.component.scss'],
})
export class FletesDisComponent implements OnInit {
  
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
           this.getDatosFletero(res.uid);
      } else {
        console.log('no está logeado');
        this.login = false;
       this.router.navigate(['/login'])
        
      }   
 })}

  ngOnInit() {

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
