import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Opiniones, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss'],
})
export class HomeUserComponent implements OnInit {

op: Opiniones = {
  id: '',
  nombre: '',
  apellido: '',
  mensaje: '',
  perfil: 'Usuario' 
}

  constructor(  private router: Router,
                private db: FirestoreService,
                private interaction: InteractionService,
                private authS: AuthService, 

    ) { }
  
    ngOnInit() {}
  
    verRespuestas(){
      this.router.navigate(['/precios']);
    }
  
    pedirF(){
        this.router.navigate(['/fletes']);
    }
  
    ChatV(){
      this.router.navigate(['/chat']);
    }
  
    enviarOpinion(){
      this.authS.stateUser<UserU>().subscribe( res  => {
          
        if (res ) {
          const path = 'Usuarios'
          this.db.getDoc<UserU>(path, res.uid).subscribe( res2 => {
          this.interaction.presentLoading;
          const data = this.op;
          // data.uid = this.db.createId();
          data.id = res.uid;
          data.nombre = res2.nombre
          data.apellido = res2.apellido
          // data.id = res.uid;
          console.log("estos:", data.id);
  
      const enlace = `Opiniones`;
      
      this.db.createDoc<Opiniones>(data, enlace, data.id).then((_) =>{
          this.interaction.presentToast('Enviado con exito');
          this.interaction.closeLoading;
          this.router.navigate(['/home']);
          this.op={
            id: data.id,
            nombre: '',
            apellido: '',
            perfil:'Usuario',
            mensaje: '',
           };
          } );
      } );
    }   
  }) 
    }

    opcionNoHabilitada(): void {
      alert("Esta opción aún no está habilitada");
  }
  

}
