import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserF, UserU } from '../models/models';
import { InteractionService } from './interaction.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private authS: AngularFireAuth,
               private interaction: InteractionService, 
               private router: Router,
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
  stateUser(){
    return this.authS.authState
  }

  getCollection<UserI>(path: string) {

    const collection = this.firestore.collection<UserI>(path);
    return collection.valueChanges();

  }

}
