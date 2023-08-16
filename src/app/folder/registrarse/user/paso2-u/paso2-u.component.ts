  import { Component, OnInit, ViewChild } from '@angular/core';
  import { Router } from '@angular/router';
  import { IonModal } from '@ionic/angular';
  import { UserU } from 'src/app/folder/models/models';
  import { AuthService } from 'src/app/folder/services/auth.service';
  import { FirestoreService } from 'src/app/folder/services/firestore.service';
  import { InteractionService } from 'src/app/folder/services/interaction.service';
  import { OverlayEventDetail } from '@ionic/core/components';
  import { GoogleAuthProvider } from 'firebase/auth';
  import { AngularFireAuth } from '@angular/fire/compat/auth';
  import { getAuth, sendEmailVerification } from 'firebase/auth';
  import { NgForm } from '@angular/forms'; // Agrega esta importación

  @Component({
    selector: 'app-paso2-u',
    templateUrl: './paso2-u.component.html',
    styleUrls: ['./paso2-u.component.scss'],
  })
  export class Paso2UComponent implements OnInit {
    @ViewChild(IonModal) modal: IonModal;

    name: string;
    message = "putoss";

    registerU: UserU = {
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
      perfil:  'Usuario',
    };

    constructor(private routes: Router,
      private authS: AuthService,      
      private interaction: InteractionService,    
      private firestore: FirestoreService,    
      private afAuth: AngularFireAuth,
      private router: Router
    ) { }

    ngOnInit() {
      // this.onWillDismiss();
    }

    async siguiente() {
      this.interaction.presentLoading('Guardando datos Vehiculares...');
      this.authS.stateUser<UserU>().subscribe( res  => {
        this.registerU.uid = res.uid;
        console.log("dad",res.uid)
        const path= `Usuarios`
        this.firestore.getDoc<UserU>(path, res.uid).subscribe( res2 => {
          this.interaction.closeLoading();
          if (res2){
            console.log("res", res2)
            const id = res.uid;
              const path2 = `Usuarios/${res.uid}/DatosPersonales`
              // aqui podemos usar dos maneras distintas 
              // 1)_ createDoc para crear un documento con id
              // 2)_ Createdocument para crear infinidad de documenteos
            this.firestore.createDoc(this.registerU, path2, id);
            this.router.navigate(['/home']);
          }
        })  
      })
  }
    

    
    
    

    volver() {
      this.routes.navigate(['/registrarse']);
    }

    next() {
      this.authS.stateUser<UserU>().subscribe( res  => {
        this.registerU.uid = res.uid;
        console.log("dad",res.uid)
        this.interaction.presentLoading('Guardando datos personales...');
        const path= `users`
        this.firestore.getDoc<UserU>(path, res.uid).subscribe( res2 => {
          console.log("res", res2)
        })
      })
    }

   

    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      // const provider = new firebase.auth.GoogleAuthProvider();

      this.afAuth.signInWithPopup(provider)
        .then((result) => {
          // El usuario ha iniciado sesión exitosamente
          // Puedes acceder al correo electrónico del usuario a través de result.user.email
          const userEmail = result.user.email;
          const userId = result.user.uid;

        })
        .catch((error) => {
          // Ocurrió un error durante la autenticación
          console.log('Error al autenticar con Google:', error);
        });
    }






    cancel() {
      this.modal.dismiss(null, 'cancel');
    }

    confirm() {
      this.modal.dismiss(this.name, 'confirm');
    }

    onWillDismiss(event: Event) {
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
      if (ev.detail.role === 'confirm') {
        this.message = `Hello, ${ev.detail.data}!`;
      }
    }



    
  }
