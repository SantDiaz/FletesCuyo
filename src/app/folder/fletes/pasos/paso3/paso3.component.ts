import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosFlete, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';

@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.scss'],
})
export class Paso3Component implements OnInit {

  
  filter: string = "filtro";
  login: boolean = false;
  DatosU: DatosFlete[] = [];

  constructor(  private auth: AuthService,
                private router: Router,
                private db: FirestoreService,) { }  

  ngOnInit(
    
  ) {     
    this.auth.stateUser<UserU>().subscribe( res  => {
      if (res) {
        this.login = true;
        this.loadComprobante(res.uid);
      } else {
        this.login = false;
         this.router.navigate(['/login'])
        
      }   
 })
}



loadComprobante(uid : string){
  const path = "PedirFlete3"
  this.db.getCollection2<DatosFlete>(path, uid).subscribe(res =>{

    if(res){
      console.log("esto", res);
      this.DatosU = res;
    }

  })
}

}
