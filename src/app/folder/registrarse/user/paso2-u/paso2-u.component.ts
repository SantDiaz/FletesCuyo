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
    prefijosTelefonicos = [
      "11", "351", "3543", "379", "370", "221", "380", "261", "299", "343",
      "376", "2804", "362", "2966", "387", "383", "264", "266", "381", "388",
      "342", "2954", "385", "2920", "2901"
    ];
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
      this.interaction.presentLoading('Guardando datos Personales...');
      this.authS.stateUser<UserU>().subscribe( res  => {
        this.interaction.closeLoading();
        this.registerU.uid = res.uid;
        console.log("dad",res.uid)
        const path= `Usuarios`
        this.firestore.getDoc<UserU>(path, res.uid).subscribe( res2 => {
          this.interaction.closeLoading();
          if (res2){
          this.interaction.closeLoading();
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






    validateNombre() {
      // Agrega tu lógica de validación personalizada aquí
      // Por ejemplo, puedes verificar si el nombre tiene al menos 3 caracteres
      if (this.registerU.nombre && this.registerU.nombre.length < 3) {
        return true; // La validación falla
      }
      return false; // La validación pasa
    }
    validateApellido() {
      // Agrega tu lógica de validación personalizada aquí
      // Por ejemplo, puedes verificar si el apellido tiene al menos 3 caracteres
      if (this.registerU.apellido && this.registerU.apellido.length < 3) {
        return true; // La validación falla
      }
      return false; // La validación pasa
    }
    validateDNI() {
      // Utiliza una expresión regular para validar el patrón del DNI
      const dniPattern = /^[0-9]{8}$/;
      if (!dniPattern.test(this.registerU.dni)) {
        return true; // La validación falla
      }
      return false; // La validación pasa
    }
  
    validateTelefono(telefono: string): boolean {
      // Ensure that telefono is not undefined or empty
      if (!telefono) {
        return false; // Return false if telefono is undefined or empty
      }
    
      // Eliminate spaces and hyphens, if any
      const numeroLimpio = telefono.replace(/\s+/g, '').replace(/-/g, '');
    
      // Extract the prefix (first 3 or 4 digits)
      const prefijo = numeroLimpio.substring(0, 3);
      // Verifica si el prefijo está en el arreglo de prefijos
      if (this.prefijosTelefonicos.includes(prefijo)) {
        // Verifica si el número tiene entre 10 y 11 dígitos en total
        if (numeroLimpio.length < 10 || numeroLimpio.length > 11) {
          return false; // La validación falla
        }
  
        // Verifica si todos los caracteres son dígitos numéricos
        if (!/^\d+$/.test(numeroLimpio)) {
          return false; // La validación falla
        }
  
        // Si todas las validaciones pasan, consideramos el número válido
        return true;
      }
  
      return false; // La validación falla si el prefijo no está en el arreglo
    }
  
    // Resto de tu código aquí...
    
    validateDomicilio() {
      if (!this.registerU.domicilio) {
        return true; // La validación falla si el campo está vacío
      }
      return false; // La validación pasa si el campo no está vacío
    }
    
    validateEdad() {
      const edad = this.registerU.edad;
      if (edad < 18 || edad > 65) {
        return true; // La validación falla
      }
      return false; // La validación pasa
    }


    
  }
