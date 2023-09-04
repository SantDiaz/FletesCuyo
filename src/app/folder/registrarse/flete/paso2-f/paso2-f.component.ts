import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IonModal, LoadingController, ToastController } from '@ionic/angular';
import { UserF, datosVehiculo, tipoVehiculo } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { NuevoService } from 'src/app/folder/services/nuevo.service';

@Component({
  selector: 'app-paso2-f',
  templateUrl: './paso2-f.component.html',
  styleUrls: ['./paso2-f.component.scss'],
})
export class Paso2FComponent implements OnInit {
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
    verificado: false,
    habilitado: false,
    email: null,
    password: null,
    perfil:  'Fletero',
    datosVehiculos: null,
  }

  constructor(private routes: Router,
    private authS: AuthService,      
    private interaction: InteractionService,    
    private firestore: FirestoreService,    
    private db: NuevoService,    
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    // this.onWillDismiss();
  }

  async siguiente() {
    await  this.interaction.presentLoading('Guardando datos personales...');
    this.authS.stateUser<UserF>().subscribe( res  => {
      this.registerF.uid = res.uid;
      console.log("dad",res.uid)
      const path= `Fleteros`
      this.firestore.getDoc<UserF>(path, res.uid).subscribe( res2 => {
        this.interaction.closeLoading();

        if (res2){
          console.log("res", res2)
          // const id = res.uid;
          // const path2 = `Fleteros/${res.uid}/DatosPersonales`
          // aqui podemos usar dos maneras distintas 
          // 1)_ createDoc para crear un documento con id
          // 2)_ Createdocument para crear infinidad de documenteos
          // this.firestore.createDoc(this.registerF, path2, id);
          
        }
      })  
      const datosPersonales = {
        nombre: this.registerF.nombre,
        apellido: this.registerF.apellido,
        dni: this.registerF.dni,
        edad: this.registerF.edad,
        domicilio: this.registerF.domicilio,
        telefono: this.registerF.telefono,
        verificado: false,
        habilitado: false,
      };
      const path3 = `Fleteros/${res.uid}`;
      this.db.updateDocument(path3, datosPersonales).then(_ => {
        // Realiza las acciones necesarias después de actualizar
      this.router.navigate(['/paso3F']);
      }).catch(error => {
        console.error(`Error updating pedido ${res.uid}:`, error);
      });
    })
}
}
  