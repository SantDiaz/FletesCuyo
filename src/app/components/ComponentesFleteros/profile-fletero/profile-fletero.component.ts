import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { datosVehiculo, tipoVehiculo, UserF } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';

@Component({
  selector: 'app-profile-fletero',
  templateUrl: './profile-fletero.component.html',
  styleUrls: ['./profile-fletero.component.scss'],
})
export class ProfileFleteroComponent implements OnInit {


  login: boolean = false;
  DatosF: UserF;
  DatosG: UserF;
  DatosV: datosVehiculo;


  constructor(  private auth: AuthService,
                private router: Router,
                private db: FirestoreService,) { }  

  ngOnInit(
    
  ) {     
    this.auth.stateUser<UserF>().subscribe( res  => {
      if (res) {
        this.login = true;
        this.getDatosUser(res.uid);
        this.getDatosVehicular(res.uid);
        this.getDatosG(res.uid)
      } else {
        this.login = false;
         this.router.navigate(['/login'])
        
      }   
 })
}


getDatosG(uid: string) {
  const path = `Fleteros`;
  const id = uid;
  
  this.db.getDoc<UserF>(path, id).subscribe( res => {
    if (res ) {
      this.DatosF = res;
      // console.log('id personal -> ', uid);
      // console.log('trae esto-->', res );
      // console.log('datos vehicular', this.DatosV );
      }
      else{
        // console.log('Tiene errores -> ');
      }
  })
}

getDatosUser(uid: string) {
  const path = `Fleteros/${uid}/DatosPersonales`;
  const id = uid;
  
  this.db.getDoc<UserF>(path, id).subscribe( res => {
    if (res ) {
      this.DatosF = res;
      // console.log('id personal -> ', uid);
      // console.log('trae esto-->', res );
      // console.log('datos vehicular', this.DatosV );
      }
      else{
        // console.log('Tiene errores -> ');
      }
  })
}

getDatosVehicular(uid: string) {
  const path = `Fleteros/${uid}/DatosVehicular`;
  const id = uid;
  
  this.db.getDoc<datosVehiculo>(path, id).subscribe( res => {
    if (res ) {
      this.DatosV = res;
      // console.log('trae esto vehicular-->', res );
      }
      else{
        // console.log('Tiene errores -> ');
      }
  })
}




}
