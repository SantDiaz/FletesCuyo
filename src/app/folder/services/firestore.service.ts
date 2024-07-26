import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DatosFlete, UserF, datosVehiculo, respuesta } from '../models/models';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})


export class FirestoreService {
  private pedidoId: string;
  



  fletes: DatosFlete[] = []
  
  constructor(private firestore: AngularFirestore,
              public fireStorage: AngularFireStorage,
              public auths : AuthService
             ) { }

             async movePedidoToPedidosHechos(pedido: DatosFlete, respuesta: respuesta) {
              try {
                const precio = respuesta.precio;
            
                // Agregar el pedido a la colección "PedidosFinalizados" con el precio proporcionado
                const pedidoHecho = { ...pedido, precio };
                
                // Obtener una referencia al documento en "PedidosFinalizados"
                const pedidoFinalizadoRef = this.firestore.collection(`PedirFlete/${pedido.uid}/PedidosFinalizados`).doc(pedido.id);
                
                // Agregar el pedido y la respuesta al mismo documento en "PedidosFinalizados"
                await pedidoFinalizadoRef.set({
                  ...pedidoHecho,
                  respuesta: respuesta // Esto agrega la respuesta como un campo dentro del documento
                });
            
                // Eliminar el pedido de la colección actual
                await this.firestore.doc(`PedirFlete/${pedido.uid}/Pedidos/${pedido.id}`).delete();
                await this.firestore.doc(`PedirFlete/${pedido.uid}/Pedidos/${pedido.id}/Respuesta/${respuesta.idFletero}`).delete();
                // Show a success message
                return true; // Éxito
              } catch (error) {
                console.error('Error al mover el pedido:', error);
                return false; // Error
              }
            }
            



    deleteDocument(path: string, id: string): Promise<void> {
    return this.firestore.collection(path).doc(id).delete();
      }
              


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

  getAllFletero(){
    const pedidosCollectionPath = 'Fleteros'
    return this.firestore.collection(pedidosCollectionPath).valueChanges() as Observable<UserF[]>;

  }

  getAllPedidos() {
    return this.auths.stateUser().pipe(
      switchMap((user) => {
        if (user) {
          // Obtén el UID del usuario autenticado
          const uid = user.uid;
          
          // Construye la ruta a la colección de pedidos del usuario
          const pedidosCollectionPath = `PedirFlete/${uid}/Pedidos`;
  
          // Devuelve un observable que obtiene los datos de la colección
          return this.firestore.collection(pedidosCollectionPath).valueChanges() as Observable<DatosFlete[]>;
        } else {
          // Si el usuario no está autenticado, devuelva un observable vacío o maneje el caso según su lógica
          // return of([]);
        }
      })
    );
  }
  
  // updateDoc3(path: string, data: any): Promise<void> {
  //   return this.firestore.doc(path).update(data);
  // }
  
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
    return this.firestore.doc<tipo>(path).valueChanges();
  }
  
  
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
  updateDoc(path: string, id: string, data: any) {
    return  this.firestore.collection(path).doc(id).update(data);
  }
  
  //para recomendacion
  updateDoc2(path: string, id: string, data: any) {
    return  this.firestore.collection(path).doc(id).update(data);
  }
  
  //setear
  setDoc<T>(path: string, id: string, data: T): Promise<void> {
    const documentRef = this.firestore.collection<T>(path).doc<T>(id);
    return documentRef.set(data);
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



//card
getAll(collection: string): Observable<any[]> {
  return this.firestore.collection(collection).valueChanges();
}



createDoc5(data: any, collectionPath: string, documentId: string): Promise<void> {
  const docRef = this.firestore.collection(collectionPath).doc(documentId);
  return docRef.set(data, { merge: true });
}

}