import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatosFlete, UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  loading: any;
  login: boolean = false;
  filter: string = "filtro";
  DatosU: UserU;
  fletes: DatosFlete[] = []

  pasosFlete: DatosFlete={
    fecha: null,
    hora: null, 
    minutos: null,
    uDesde: '',
    uHasta: '',
    cargamento: '',
    tipoVehiculo:  null,
    ayudantes:  null ,
    uid:  null ,
    id: '',
    precio: null,

   };

  constructor(private db: FirestoreService,
              private auth: AuthService,
              private router: Router,
              public toastController: ToastController,
              private loadingCtrl: LoadingController, 
    ) { }
    

  ngOnInit() {
    this.getItems();
    this.auth.stateUser<UserU>().subscribe( res  => {
      if (res) {
        this.login = true;
        this.getDatosUser(res.uid);
      } else {
        this.login = false;
         this.router.navigate(['/login'])
        
      }   
 })
    
  }

  // trae el nombre del usuario
  getDatosUser(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.db.getCollection<DatosFlete>(path).subscribe(res => {
      // this.fletes = res;
      console.log('trae esto User-->', res );
    });
  }



  // trae datos del flete
  getItems() {
    const enlace = 'PedirFlete3'; 
    this.db.getCollection<DatosFlete>(enlace).subscribe(res => {
      this.fletes = res;
      console.log('trae esto fletes-->', res );
    });
  }

 















async presentToast(mensaje: string, tiempo: number) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: tiempo,
    position: 'middle'
  });
  await toast.present();
}

async presentLoading() {
  this.loading = await this.loadingCtrl.create({
    message: 'Guardando',
  });

 await this.loading.present();
}

  
}
