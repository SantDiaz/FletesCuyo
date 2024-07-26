import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { getAuth, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth';


@Component({
  selector: 'app-paso1-u',
  templateUrl: './paso1-u.component.html',
  styleUrls: ['./paso1-u.component.scss'],
})
export class Paso1UComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  valueSelected:any = "1";
  name: string;

  prefijosTelefonicos = [
        "11", "351", "3543", "379", "370", "221", "380", "261", "299", "343",
        "376", "2804", "362", "2966", "387", "383", "264", "266", "381", "388",
        "342", "2954", "385", "2920", "2901"
      ];
  message = "putoss"

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
    perfil: 'Usuario'  ,

  }

  constructor(private routes: Router,
    private authS: AuthService,      
    private interaction: InteractionService,    
    private firestore : FirestoreService,    
    private router: Router,
    ) {
      this.registerU = {
        uid: '',
        nombre: '',
        apellido: '',
        dni: '',
        edad: null,
        domicilio: '',
        telefono: '',
        image: '',
        perfil: 'Usuario'  ,
        email: '',
        password: '',
      };
    
     }


  ngOnInit() {
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
    //   this.onWillDismiss(ev)
  }

  volver(){
    this.routes.navigate(['/registrarse']);
  }


  next(){
    this.routes.navigate(['/registrarse']);
  }

  customEmailValidator(value: string): { [key: string]: any } | null {
    if (!value || !value.includes('@') || !value.includes('.com') && !value.includes('.')) {
      return { customEmailError: true };
    }
    return null;
  }

  customPasswordValidator(value: string): { [key: string]: any } | null {
    if (!value || value.length < 8 || !/[A-Z]/.test(value)) {
      return { customPasswordError: true };
    }
    return null;
  }

  async siguiente() {
    await this.interaction.presentLoading("Registrando...");
  
    if (this.customEmailValidator(this.registerU.email)) {
      this.interaction.closeLoading();
      this.interaction.presentToast('El correo electrónico no es válido.');
      return;
    }
  
    // Validación de contraseña
    if (this.customPasswordValidator(this.registerU.password)) {
      this.interaction.closeLoading();
      this.interaction.presentToast('La contraseña no cumple con los requisitos.');
      return;
    }
  
    // Si tanto el correo electrónico como la contraseña son válidos, continuar con el registro
    try {
      console.log("Registro exitoso");
      this.interaction.closeLoading();
      this.interaction.presentToast('Registro exitoso.');

      await this.authS.registerU(this.registerU);
              this.valueSelected = '2'; // Asegúrate de que el valor asignado sea una cadena
    } catch (error) {
      console.log(error);
      this.interaction.closeLoading();
      this.interaction.presentToast('Error en el registro');
    }
  }
  
  signInWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
  
    signInWithPopup(auth, provider)
      .then((result) => {
        const email = result.user.email;
        const path = "Usuarios";
        const uid = result.user.uid;
  
        // Crear un objeto con el correo electrónico
        const userData = { email: email, perfil:'Usuario' };
  
        this.firestore.createDoc(userData, path, uid).then((res) => {
          this.router.navigate(['/paso2U']);
          console.log('Usuario autenticado con Google:', result.user);
        });
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google:', error);
        this.interaction.presentToast('Error al iniciar sesión con Google');
      });
  }
  
  // siguiente() {
  //   if (parseInt(this.valueSelected) === 1) {
  //     // Si aún estamos en el primer paso, cambia al segundo paso
  //     this.valueSelected = '2'; // Asegúrate de que el valor asignado sea una cadena
  //   } else {
  //     // Si estamos en el segundo paso, envía los datos
  //   }
  // }

  btn1(){
    this.valueSelected = '1'; // Asegúrate de que el valor asignado sea una cadena
}

btn2(){
    this.valueSelected = '2'; // Asegúrate de que el valor asignado sea una cadena
}




    async enviar() {
      // Validar los datos antes de continuar

    //      if (this.customEmailValidator(this.registerU.email)) {
    //   this.interaction.closeLoading();
    //   this.interaction.presentToast('El correo electrónico no es válido.');
    //   return;
    // }
  
    // // Validación de contraseña
    // if (this.customPasswordValidator(this.registerU.password)) {
    //   this.interaction.closeLoading();
    //   this.interaction.presentToast('La contraseña no cumple con los requisitos.');
    //   return;
    // }
 
      if (this.validateNombre()) {
        this.interaction.presentToast('El nombre no es válido.');
        return;
      }
    
      if (this.validateApellido()) {
        this.interaction.presentToast('El apellido no es válido.');
        return;
      }
    
      if (this.validateDNI()) {
        this.interaction.presentToast('El DNI no es válido.');
        return;
      }
    
      if (!this.validateTelefono(this.registerU.telefono)) {
        this.interaction.presentToast('El teléfono no es válido.');
        return;
      }
    
      if (this.validateDomicilio()) {
        this.interaction.presentToast('El domicilio no puede estar vacío.');
        return;
      }
    
      if (this.validateEdad()) {
        this.interaction.presentToast('La edad no es válida.');
        return;
      }
    
      // Si todos los datos son válidos, continúa con el registro
      this.authS.stateUser<UserU>().subscribe(res => {
        this.registerU.uid = res.uid;
        console.log("dad", res.uid)
        const path = `Usuarios`
        this.firestore.getDoc<UserU>(path, res.uid).subscribe(res2 => {
          if (res2) {
            this.registerU.image = this.registerU.image;
            const id = res.uid;
            const path2 = `Usuarios/${res.uid}/DatosPersonales`
            this.firestore.createDoc(this.registerU, path2, id);
            this.router.navigate(['/home']);
          }
        })
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
