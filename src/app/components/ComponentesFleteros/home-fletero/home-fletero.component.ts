import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Opiniones, UserF } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';

@Component({
  selector: 'app-home-fletero',
  templateUrl: './home-fletero.component.html',
  styleUrls: ['./home-fletero.component.scss'],
})
export class HomeFleteroComponent implements OnInit {


  op: Opiniones = {
    id: '',
    nombre: '',
    apellido: '',
    perfil: 'Fletero',
    mensaje: '',
  }


  constructor(  private router: Router,
                private db: FirestoreService,
                private interaction: InteractionService,
                private authS: AuthService, 
                ) { }
  
    ngOnInit() {}
  
  
    pedirF(){
        this.router.navigate(['/paso1']);
    }
  
    ChatV(){
      this.router.navigate(['/chat']);
    }


    

    enviarOpinion(){
      this.authS.stateUser<UserF>().subscribe( res  => {
          
        if (res ) {
          const path = 'Fleteros'
          this.db.getDoc<UserF>(path, res.uid).subscribe( res2 => {
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
            perfil:'Fletero',
            mensaje: '',
           };
          } );
      } );
    }   
  }) 
    }

}
