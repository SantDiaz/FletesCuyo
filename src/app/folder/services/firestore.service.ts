import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore,
              public fireStorage: AngularFireStorage,
             ) { }


  createDoc(data: any, path: string, id: string) {

    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);

  }
  // createDocF(data: any, path: string, id: string) {

  //   const collection = this.firestore.collection(path);
  //   return collection.doc(id).set(data);

  // }

  getId() {
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