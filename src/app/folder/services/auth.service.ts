import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { datosVehiculo, UserF, UserU } from '../models/models';
import { InteractionService } from './interaction.service';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private authS: AngularFireAuth,
               private interaction: InteractionService, 
               private router: Router,
              public fireStorage: AngularFireStorage,
               private firestore: AngularFirestore ) { }

  login(email:string, password:string){
    return  this.authS.signInWithEmailAndPassword(email, password);
  }

  logout(){
    this.authS.signOut();
    this.interaction.presentToast('Sesion finalizada...')
    this.router.navigate(['/login']);
  }


  registerF(registerU: UserF, habilitado: boolean): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.authS.createUserWithEmailAndPassword(registerU.email, registerU.password)
        .then((result) => {
          const user = result.user;
  
          // Guardar email y contraseña en Firestore
          const collectionRef = this.firestore.collection('Fleteros');
          const docRef = collectionRef.doc(user.uid); // Utiliza el UID del usuario como ID del documento
          docRef.set({
            habilitado: habilitado,
            email: registerU.email,
            password: registerU.password,
            perfil: 'Fletero'
            // Otras propiedades que desees guardar
          }).then(() => {
            resolve(); // Resuelve la promesa una vez que se haya completado todo
          }).catch((error) => {
            reject(error); // Rechaza la promesa en caso de error en Firestore
          });
        })
        .catch((error) => {
          reject(error); // Rechaza la promesa en caso de error en createUserWithEmailAndPassword
        });
    });
  }



  registerU(registerU: UserU): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.authS.createUserWithEmailAndPassword(registerU.email, registerU.password)
        .then((result) => {
          const user = result.user;
  
          // Guardar email y contraseña en Firestore
          const collectionRef = this.firestore.collection('Usuarios');
          const docRef = collectionRef.doc(user.uid); // Utiliza el UID del usuario como ID del documento
          docRef.set({
            email: registerU.email,
            password: registerU.password,
            perfil: 'Usuario',
            // Otras propiedades que desees guardar
          }).then(() => {
            resolve(); // Resuelve la promesa una vez que se haya completado todo
          }).catch((error) => {
            reject(error); // Rechaza la promesa en caso de error en Firestore
          });
        })
        .catch((error) => {
          reject(error); // Rechaza la promesa en caso de error en createUserWithEmailAndPassword
        });
    });
  }






  stateUser<tipo>(){
    return this.authS.authState
  }

  getCollection<UserU>(path: string, id:string) {

    const collection = this.firestore.collection<UserU>(path);
    return collection.valueChanges();

  }
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      const result = await this.authS.signInWithPopup(provider);
      const user = result.user;
      const email = user.email;
      
      // Guardar el correo electrónico en Firestore
      this.saveEmailToFirestore(email);

      // Puedes realizar otras acciones después de iniciar sesión exitosamente
      // ...

    } catch (error) {
      console.log(error);
      // Manejar el error de inicio de sesión
    }
  }

  private saveEmailToFirestore(email: string) {
    // Guardar el correo electrónico en Firestore
    const collectionRef = this.firestore.collection('users');
    const docRef = collectionRef.doc(); // Puedes utilizar un ID de documento personalizado si lo deseas
    docRef.set
}

}