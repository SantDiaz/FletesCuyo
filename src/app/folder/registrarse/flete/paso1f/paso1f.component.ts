import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { datosVehiculo, tipoVehiculo, UserF } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { getAuth, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth';
import { take } from 'rxjs/operators';
import { NuevoService } from 'src/app/folder/services/nuevo.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-paso1f',
  templateUrl: './paso1f.component.html',
  styleUrls: ['./paso1f.component.scss'],
})
export class Paso1fComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  private formularioEnviado: boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;

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

  
  Datovehicular: datosVehiculo = {
    uid: null,
    tipoVehiculo: null,
    marca: null,
    ano: null,
    modelo: null,
    patente: '',
    imagePatente: null,
    imageDni: null,
    imageCarnet: null,
    imageDniDorzal: null,
    imageCarnetDorzal: null
  }

loading: any;
vehiculo = tipoVehiculo;
  
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
    private storage: AngularFireStorage


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
            if(!res){
              this.interaction.closeLoading();
              this.interaction.presentToast('Falta completar datos.');

            }
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
                  this.valueSelected = '3'; // Asegúrate de que el valor asignado sea una cadena
                
                return
              } else{
                  this.interaction.closeLoading();
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
    


    onImagePerfil(event: any): void {
      const file = event.target.files[0];
      this.uploadImageToStorage(file, 'image');
    }


    
  async uploadImageToStorage(file: File | null, imageType: string) {
    if (!file) {
      return; // Asegúrate de manejar el caso en que el archivo sea nulo
    }
  
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileDataUrl: string = event.target.result as string;
  
        const timestamp = new Date().getTime().toString();
        const imageName = `${timestamp}.jpg`;
  
        const storageRef = this.storage.ref(`images/${imageName}`);
        const uploadTask = await storageRef.putString(fileDataUrl, 'data_url');
        const downloadUrl = await uploadTask.ref.getDownloadURL();
  
        // Asigna la URL de descarga al campo correspondiente según el tipo de imagen
        if (imageType === 'image') {
          this.registerF.image = downloadUrl;
        } 
      };
  
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error al subir la imagen a Firebase Storage:', error);
      // Manejar el error según tus necesidades (por ejemplo, mostrar un mensaje al usuario)
    }
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
      if (!telefono) {
        return false;
      }
      const numeroLimpio = telefono.replace(/\s+/g, '').replace(/-/g, '');
      const prefijo = numeroLimpio.substring(0, 3);
      if (this.prefijosTelefonicos.includes(prefijo)) {
        if (numeroLimpio.length < 10 || numeroLimpio.length > 11) {
          return false;
        }
        if (!/^\d+$/.test(numeroLimpio)) {
          return false;
        }
        return true;
      }
      return false;
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
  

  
  btn3(){
    this.valueSelected = '3'; // Asegúrate de que el valor asignado sea una cadena
}








//paso 3 vehiculos




  
  
  
async enviarF() {
  // Validate the form fields
  if (this.validateForm()) {
    // If the form is valid, proceed with saving the data
    this.authS.stateUser<UserF>().subscribe((res) => {
      this.interaction.closeLoading();
          const id = res.uid;
          const path2 = `Fleteros/${res.uid}/DatosVehiculares`;

          // Actualiza la propiedad patenteImage con la representación en base64
          const datosVehicularesConImagen = {
            ...this.Datovehicular,
          };

          // Ahora, puedes guardar todo el objeto en la colección
          this.firestore.createDocument<datosVehiculo>(datosVehicularesConImagen, path2, id)
            this.interaction.presentToast('Registrado con éxito');
              this.router.navigate(['/home']);

          });
  } else {
    // If the form is not valid, display an error messagjjje or take appropriate action
    console.log("Form validation failed. Please complete all fields correctly.");
    // You can also display a toast or other error message to the user.
  }
}



validateForm(): boolean {
  
  // Validación para el campo tipoVehiculo
  if (!this.Datovehicular.tipoVehiculo || 
      (this.Datovehicular.tipoVehiculo !== 'Camioneta' &&
          this.Datovehicular.tipoVehiculo !== 'Camion' &&
          this.Datovehicular.tipoVehiculo !== 'Grua' &&
          this.Datovehicular.tipoVehiculo !== 'Furgonetas' &&
          this.Datovehicular.tipoVehiculo !== 'Camiones frigoríficos' &&
          this.Datovehicular.tipoVehiculo !== 'Otro...')) {
  return false; // Validación fallida para el campo tipoVehiculo
}

  // Validación para el campo marca
  if (!this.Datovehicular.marca || this.Datovehicular.marca.trim() === '') {
    return false; // Validación fallida para el campo marca
  }

  // Validación para el campo modelo
  if (!this.Datovehicular.modelo || this.Datovehicular.modelo.trim() === '') {
    return false; // Validación fallida para el campo modelo
  }

  // Validación para el campo patente
  const patentePattern = /^[A-Z0-9]{6,8}$/; // Example pattern for a 6-character alphanumeric patente
  if (!this.Datovehicular.patente || !patentePattern.test(this.Datovehicular.patente)) {
    return false; // Validación fallida para el campo patente
  }

  return (
    !this.validateTipoVehiculo() &&
    !this.validateMarca() &&
    !this.validateModelo() 
    &&  !this.validatePatente()
  );  }







  validateTipoVehiculo() {
    // Check if the tipoVehiculo field is not one of the allowed types
    const allowedTypes: ('Camioneta' | 'Camion' | 'Grua' | 'Furgonetas' | 'Camiones frigoríficos' | 'Otro...' )[] = ['Camioneta' , 'Camion' , 'Grua' , 'Furgonetas' , 'Camiones frigoríficos' , 'Otro...' ];
    return !this.Datovehicular.tipoVehiculo || !allowedTypes.includes(this.Datovehicular.tipoVehiculo);
  }
  
  
  validateMarca() {
    // Check if the marca field is empty or contains only whitespace
    return !this.Datovehicular.marca || this.Datovehicular.marca.trim() === '';
  }
  
  validateModelo() {
    // Check if the modelo field is empty or contains only whitespace
    return !this.Datovehicular.modelo || this.Datovehicular.modelo.trim() === '';
  }
  
  validatePatente() {
    // Convert patente to a string and then check if it matches the pattern
    const patentePattern = /^[A-Z0-9]{6,9}$/; // Pattern for a 6-character alphanumeric patente
    return !this.Datovehicular.patente.toString() || !patentePattern.test(this.Datovehicular.patente.toString());
  }
  


















  }
