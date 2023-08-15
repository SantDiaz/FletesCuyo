import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IonModal, LoadingController, ToastController } from '@ionic/angular';
import { UserF, datosVehiculo, tipoVehiculo } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';


@Component({
  selector: 'app-paso3f',
  templateUrl: './paso3f.component.html',
  styleUrls: ['./paso3f.component.scss'],
})
export class Paso3fComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  name: string;
  message = "putoss";
  
  registerF: UserF = {
    uid: null,
    nombre: null,
    apellido: null,
    dni: null,
    edad: null,
    domicilio: null,
    telefono: null,
    image: null,
    email: null,
    password: null,
    perfil:  'Fletero',
    datosVehiculos: null,
  };

  Datovehicular: datosVehiculo = {
    uid: null,
    tipoVehiculo: null,
    marca: null,
    modelo: null,
    patente: null,
  }

loading: any;
vehiculo = tipoVehiculo;

  constructor(private routes: Router,
    private authS: AuthService,      
    private interaction: InteractionService,    
    private firestore: FirestoreService,    
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async siguiente() {
    this.interaction.presentLoading('Guardando datos Vehiculares...');
    this.authS.stateUser<UserF>().subscribe( res  => {
      this.registerF.uid = res.uid;
      console.log("dad",res.uid)
      const path= `Fleteros`
      this.firestore.getDoc<UserF>(path, res.uid).subscribe( res2 => {
        this.interaction.closeLoading();
        if (res2){
          console.log("res", res2)
          const id = res.uid;
            const path2 = `Fleteros/${res.uid}/DatosVehiculares`
            // aqui podemos usar dos maneras distintas 
            // 1)_ createDoc para crear un documento con id
            // 2)_ Createdocument para crear infinidad de documenteos
          this.firestore.createDoc(this.Datovehicular, path2, id);
          this.router.navigate(['/home']);
        }
      })  
    })
}
}
  