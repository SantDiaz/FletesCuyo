import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { UserF } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { getAuth, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth';
import { take } from 'rxjs/operators';
import { NuevoService } from 'src/app/folder/services/nuevo.service';


@Component({
  selector: 'app-paso1f',
  templateUrl: './paso1f.component.html',
  styleUrls: ['./paso1f.component.scss'],
})
export class Paso1fComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  private formularioEnviado: boolean = false;

  name: string;
  message = "putoss"
  valueSelected:any = "1";
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
    verificado: false,
    habilitado: false,
    perfil:  'Fletero',
    datosVehiculos: null,
    recomendacion: null,
  }

  
  prefijosTelefonicos = [
    "11", "351", "3543", "379", "370", "221", "380", "261", "299", "343",
    "376", "2804", "362", "2966", "387", "383", "264", "266", "381", "388",
    "342", "2954", "385", "2920", "2901"
  ];

  constructor(private routes: Router,
    private authS: AuthService,      
    private interaction: InteractionService,    
    private firestore : FirestoreService,    
    private router: Router,
    private db: NuevoService,    

    ) {

      this.registerF = {
        uid: '',
        nombre: '',
        apellido: '',
        dni: '',
        edad: null,
        domicilio: '',
        telefono: '',
        image: '',
        perfil: 'Fletero'  ,
        email: '',
        password: '',
        habilitado: false,
        verificado: false,
        datosVehiculos: null,
        recomendacion: null
      };
     }


  ngOnInit() {

  
  }

  volver(){
    this.routes.navigate(['/registrarse']);
  }

  customEmailValidator(value: string): { [key: string]: any } | null {
    if (!value || !value.includes('@') || !value.includes('.')) {
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

  next(){
    this.routes.navigate(['/registrarse']);
  }

  async siguiente() {
    await this.interaction.presentLoading("Registrando...");
  
    if (this.customEmailValidator(this.registerF.email)) {
      this.interaction.closeLoading();
      this.interaction.presentToast('El correo electrónico no es válido.');
      return;
    }
  
    if (this.customPasswordValidator(this.registerF.password)) {
      this.interaction.closeLoading();
      this.interaction.presentToast('La contraseña no cumple con los requisitos.');
      return;
    }
  
    try {
      let habilitado = this.registerF.habilitado;
      habilitado = false;
      await this.authS.registerF(this.registerF, habilitado);
      console.log("Registro exitoso");
      this.registerF.habilitado = false;
      this.interaction.closeLoading();
      this.valueSelected = '2'; // Asegúrate de que el valor asignado sea una cadena
    } catch (error) {
      console.log(error);
      this.interaction.closeLoading();
      this.interaction.presentToast('Error en el registro');
    }
  }

  

  async enviar() {

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
  
    if (!this.validateTelefono(this.registerF.telefono)) {
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
        // Validate the form before saving data
          await this.interaction.presentLoading('Guardando datos personales...');
          
          // Get the currently authenticated user
          this.authS.stateUser<UserF>()
          .pipe(take(1))
          .subscribe(res => {
            this.db.stopLoading();
            // Your code here
            
            const path = `Fleteros`;
      
            // Check if a document for this user already exists
            this.firestore.getDoc<UserF>(path, res.uid).subscribe(res2 => {
              const datosPersonales = {
                uid: res.uid ,
                nombre: this.registerF.nombre,
                apellido: this.registerF.apellido,
                dni: this.registerF.dni,
                edad: this.registerF.edad,
                domicilio: this.registerF.domicilio,
                telefono: this.registerF.telefono,
                email: res2.email,
                perfil: res2.perfil,
                verificado: false, // Remove this line or set it to the desired value
                habilitado: false,
              };
    
              // Define the path for saving the personal data
              const path3 = `Fleteros`;
              // Update or create the document as needed
              if (this.formularioEnviado === false) {
                this.db.updateDoc(path3,res.uid, datosPersonales)
                this.registerF.image = this.registerF.image;
                  this.interaction.closeLoading();
                  this.formularioEnviado = true; // Establece la bandera en true
                  this.router.navigate(['/home']);
                
                return
              }
    
            });
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


    signInWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
    
      signInWithPopup(auth, provider)
        .then((result) => {
          const email = result.user.email;
          const path = "Fleteros";
          const uid = result.user.uid;
    
          // Crear un objeto con el correo electrónico
          const userData = { email: email, perfil:'Fletero' };
    
          this.firestore.createDoc(userData, path, uid).then((res) => {
            this.router.navigate(['/paso2F']);
            console.log('Usuario autenticado con Google:', result.user);
          });
        })
        .catch((error) => {
          console.error('Error al iniciar sesión con Google:', error);
          this.interaction.presentToast('Error al iniciar sesión con Google');
        });
    }
    



    

    validateNombre() {
      // Agrega tu lógica de validación personalizada aquí
      // Por ejemplo, puedes verificar si el nombre tiene al menos 3 caracteres
      if (this.registerF.nombre && this.registerF.nombre.length < 3) {
        return true; // La validación falla
      }
      return false; // La validación pasa
    }
    validateApellido() {
      // Agrega tu lógica de validación personalizada aquí
      // Por ejemplo, puedes verificar si el apellido tiene al menos 3 caracteres
      if (this.registerF.apellido && this.registerF.apellido.length < 3) {
        return true; // La validación falla
      }
      return false; // La validación pasa
    }
    validateDNI() {
      // Utiliza una expresión regular para validar el patrón del DNI
      const dniPattern = /^[0-9]{8}$/;
      if (!dniPattern.test(this.registerF.dni)) {
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
      if (!this.registerF.domicilio) {
        return true; // La validación falla si el campo está vacío
      }
      return false; // La validación pasa si el campo no está vacío
    }
    
    validateEdad() {
      const edad = this.registerF.edad;
      if (edad < 18 || edad > 65) {
        return true; // La validación falla
      }
      return false; // La validación pasa
    }

    btn1(){
      this.valueSelected = '1'; // Asegúrate de que el valor asignado sea una cadena
  }
  
  btn2(){
      this.valueSelected = '2'; // Asegúrate de que el valor asignado sea una cadena
  }
  
  }
