import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NuevoService {
  
  continueLoading: boolean = true;
  constructor(private firestore: AngularFirestore,
 ) { }

 get shouldContinueLoading(): boolean {
  return this.continueLoading;
}

set shouldContinueLoading(value: boolean) {
  this.continueLoading = value;
}
stopLoading() {
  this.continueLoading = false;
}

updateDoc(path: string, id: string, data: any) {
  this.continueLoading = false;
  return  this.firestore.collection(path).doc(id).update(data);
}

 obtenerDatos(miColeccion: string): Observable<any[]> {
  const collectionRef = this.firestore.collection(miColeccion);
  return collectionRef.valueChanges();
}


 getCollection(collectionName: string): Observable<any[]> {
  return this.firestore.collection(collectionName).valueChanges();
}
 updateDocument(documentPath: string, data: any, ): Promise<void> {
  this.continueLoading = false;
  const documentRef = this.firestore.doc(documentPath);
  return documentRef.update(data);
}

    async create(collection, dato){
      try{
        return await this.firestore.collection(collection).add(dato);
      }catch(err) {
        console.log("error", err);
      }
    }
    
    async getAll2<tipo>(collection){
      try{
        return await this.firestore.collection(collection).snapshotChanges();
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
