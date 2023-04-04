import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class NuevoService {

  constructor(private firestore: AngularFirestore,
 ) { }




    async create(collection, dato){
      try{
        return await this.firestore.collection(collection).add(dato);
      }catch(err) {
        console.log("error", err);
      }
    }
    
    async getAll(collection){
      try{
        return await this.firestore.collection(collection).snapshotChanges();
      }catch(err) {
        console.log("error", err);
      }
    }

    async getById(collection, id){
      try{
        return await this.firestore.collection(collection).doc(id).get();
      }catch(err) {
        console.log("error", err);
      }
    }

    async delete(collection, id){
      try{
        return await this.firestore.collection(collection).doc(id).delete();
      }catch(err) {
        console.log("error", err);
      }
    }


    deleteDoc(path: string, id: string){
      return this.firestore.collection(path).doc(id).delete();
    }

    async update(collection, id, dato){
      try{
        return await this.firestore.collection(collection).doc(id).set(dato);
      }catch(err) {
        console.log("error", err);
      }
    }

  }
