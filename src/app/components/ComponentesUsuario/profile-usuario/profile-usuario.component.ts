import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';

@Component({
  selector: 'app-profile-usuario',
  templateUrl: './profile-usuario.component.html',
  styleUrls: ['./profile-usuario.component.scss'],
})
export class ProfileUsuarioComponent implements OnInit {

  filter: string = "filtro";
  login: boolean = false;
  DatosU: UserU
  DatosG: UserU

  constructor(  private auth: AuthService,
                private router: Router,
                private db: FirestoreService,) { }  

  ngOnInit(
    
  ) {     
    this.auth.stateUser<UserU>().subscribe( res  => {
      if (res) {
        this.login = true;
        this.getDatosUser(res.uid);
        this.getDatosGmail(res.uid);
      } else {
        this.login = false;
         this.router.navigate(['/login'])
        
      }   
 })
}




getDatosUser(uid: string) {
  const path = `Usuarios/${uid}/DatosPersonales`;
  const id = uid;
  
  this.db.getDoc<UserU>(path, id).subscribe( res => {
    if (res ) {
      this.DatosU = res;
      console.log('id personal -> ', uid);
      console.log('trae esto-->', res );
      }
      else{
        console.log('Tiene errores -> ');
      }
  })
}

getDatosGmail(uid: string) {
  const path = `Usuarios`;
  const id = uid;
  
  this.db.getDoc<UserU>(path, id).subscribe( res => {
    if (res ) {
      this.DatosG = res;
      console.log('id personal -> ', uid);
      console.log('trae esto-->', res );
      }
      else{
        console.log('Tiene errores -> ');
      }
  })
}



}
