import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DatosFlete } from '../models/models';

@Injectable({
  providedIn: 'root'
})


export class FirestoreService {
  
  fletes: DatosFlete[] = []
  
  constructor(private firestore: AngularFirestore,
              public fireStorage: AngularFireStorage,
             ) { }

// guarda datos sin idÇ
  createDocument<tipo>(data: tipo, enlace: string) {
    const ref = this.firestore.collection(enlace);  
    return ref.add(data)
            }


// guarda datos con id            
  createDoc<tipo>(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);

  }

// crea un id unico 
  createId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {

    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();

  }

  getDoc<tipo>(path: string, id: string) {
   return this.firestore.collection(path).doc<tipo>(id).valueChanges()
  }

  updateDoc(path: string, id: string, data: any) {
    return  this.firestore.collection(path).doc(id).update(data);
  }
  deleteDoc(path: string, id: string){
    return this.firestore.collection(path).doc(id).delete();
  }

  openImage(file: any, path: string, nombre: string): Promise<string>{
    return new Promise( resolve =>{
   
      const filePath = path + '/' + nombre;
      const ref = this.fireStorage.ref(filePath);
      const task = ref.put(file)
      resolve('enlace')
});
}

}