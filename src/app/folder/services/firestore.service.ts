import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DatosFlete, datosVehiculo } from '../models/models';
@Injectable({
  providedIn: 'root'
})


export class FirestoreService {
  private pedidoId: string;
  

  
  fletes: DatosFlete[] = []
  
  constructor(private firestore: AngularFirestore,
              public fireStorage: AngularFireStorage,
             ) { }

// guarda datos sin idÇ
createDocument<tipo>(data: tipo, enlace: string, id: string) {
  const ref = this.firestore.doc(`${enlace}/${id}`);
  return ref.set(data);
}



// guarda datos con id            
  createDoc<tipo>(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);

  }

  async createDoc3<T>(collectionPath: string, data: T): Promise<string> {
    const collectionRef = this.firestore.collection<T>(collectionPath);
    const docRef = await collectionRef.add(data);
    return docRef.id;
  }

  async createCollection(path: string): Promise<void> {
    try {
      await this.firestore.collection(path).add({}); // Agregar un documento vacío para crear la colección
    } catch (error) {
      console.error('Error creating collection:', error);
      throw error;
    }
  }
  async addDataToDocument(collectionPath: string, documentId: string, data: any): Promise<void> {
    const documentRef = this.firestore.collection(collectionPath).doc(documentId);
    await documentRef.set(data, { merge: true });
  }

  createDoc2<tipo>(data: any, path: string, uid: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(uid).set(data);

  }

  // updateDoc3(path: string, data: any): Promise<void> {
  //   return this.firestore.doc(path).update(data);
  // }
  updateDoc3(path: string, data: any): Promise<void> {
    return this.firestore.doc(path).set(data, { merge: true });
  }
  async update(collection, id, dato){
    try{
      return await this.firestore.collection(collection).doc(id).set(dato);
    }catch(err) {
      console.log("error", err);
    }
  }

// crea un id unico 
  createId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) { 

    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();

  }

  getCollection2<tipo>(path: string, id : string) {

    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges(id);
  }


  getDoc<tipo>(path: string, id: string) {
   return this.firestore.collection(path).doc<tipo>(id).valueChanges()
  }
  getDoc2<tipo>(path: string) {
    return this.firestore.collection(path).doc<tipo>(path).valueChanges()
   }

  updateDoc(path: string, id: string, data: any) {
    return  this.firestore.collection(path).doc(id).update(data);
  }
  
  deleteDoc(path: string, id: string){
    return this.firestore.collection(path).doc(id).delete();
  }

  getCollectionRef(path: string): AngularFirestoreCollection<any> {
    return this.firestore.collection(path);
  }

  createPedido(uid: string, paso: number, data: any) {
    return this.firestore.collection('Usuarios').doc(uid).collection('Pedidos').doc(`Paso${paso}`).set(data);
  }



  setPedidoId(id: string) {
    this.pedidoId = id;
  }

  getPedidoId() {
    return this.pedidoId;
  }

}