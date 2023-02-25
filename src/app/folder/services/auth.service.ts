import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { datosVehiculo, UserF, UserU } from '../models/models';
import { InteractionService } from './interaction.service';

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

  registerF(registerF: UserF){
    return   this.authS.createUserWithEmailAndPassword(registerF.email, registerF.password);
  }



  registerU(registerU: UserU){
    return   this.authS.createUserWithEmailAndPassword(registerU.email, registerU.password);
  }
  stateUser<tipo>(){
    return this.authS.authState
  }

  getCollection<UserU>(path: string, id:string) {

    const collection = this.firestore.collection<UserU>(path);
    return collection.valueChanges();

  }

}
