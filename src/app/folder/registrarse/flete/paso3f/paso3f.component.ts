import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { IonModal, LoadingController, ToastController } from '@ionic/angular';
import { UserF, datosVehiculo, tipoVehiculo } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';

@Component({
  selector: 'app-paso3f',
  templateUrl: './paso3f.component.html',
  styleUrls: ['./paso3f.component.scss'],
})
export class Paso3fComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  name: string;
  message = "putoss";
  selectedPatenteFile: File | null = null;
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
    verificado: false,
    password: null,
    perfil:  'Fletero',
    datosVehiculos: null,
  };

  Datovehicular: datosVehiculo = {
    uid: null,
    tipoVehiculo: null,
    marca: null,
    modelo: null,
    patente: null,
    imagePatente: null,
  }

loading: any;
vehiculo = tipoVehiculo;

  constructor(private routes: Router,
    private authS: AuthService,      
    private interaction: InteractionService,    
    private firestore: FirestoreService,    
    private afAuth: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage

  ) { }

  ngOnInit() {
  } 

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      // Aquí deberías subir el archivo a Firebase Storage y obtener la URL de descarga
      // Luego, asigna la URL a this.Datovehicular.imagePatente
      // Puedes utilizar AngularFireStorage para subir la imagen a Firebase Storage
      // y obtener la URL de descarga
      // Más información aquí: https://firebase.google.com/docs/storage/web/start
      const fileDataUrl: string = e.target.result;
      this.uploadImageToStorage(fileDataUrl);
    };

    reader.readAsDataURL(file);
  }

  async uploadImageToStorage(fileDataUrl: string) {
    try {
      // Genera un nombre único para el archivo (por ejemplo, usando un timestamp)
      const timestamp = new Date().getTime().toString();
      const imageName = `${timestamp}.jpg`; // Cambia la extensión según el tipo de archivo
  
      // Sube la imagen a Firebase Storage
      const storageRef = this.storage.ref(`images/${imageName}`);
      const uploadTask = await storageRef.putString(fileDataUrl, 'data_url');
  
      // Obtiene la URL de descarga del archivo
      const downloadUrl = await uploadTask.ref.getDownloadURL();
  
      // Asigna la URL de descarga a this.Datovehicular.imagePatente
      this.Datovehicular.imagePatente = downloadUrl;
  
      // Continúa con la lógica de guardar los datos en Firestore
      // ...
    } catch (error) {
      console.error('Error al subir la imagen a Firebase Storage:', error);
      // Manejar el error según tus necesidades (por ejemplo, mostrar un mensaje al usuario)
    }
  }
  
  async siguiente() {
    // this.interaction.presentLoading('Guardando datos Vehiculares...');
    this.authS.stateUser<UserF>().subscribe((res) => {
      this.registerF.uid = res.uid;
      console.log("dad", res.uid);
      const path = `Fleteros`;
      this.firestore.getDoc<UserF>(path, res.uid).subscribe((res2) => {
        // this.interaction.closeLoading();
        if (res2) {
          console.log("res", res2);
          const id = res.uid;
          const path2 = `Fleteros/${res.uid}/DatosVehiculares`;
  
          // Actualiza la propiedad patenteImage con la representación en base64
          const datosVehicularesConImagen = {
            ...this.Datovehicular,
            patenteImage: this.Datovehicular.imagePatente,
          };
  
          // Ahora, puedes guardar todo el objeto en la colección
          this.firestore.createDoc(datosVehicularesConImagen, path2, id);
  
          this.router.navigate(['/home']);
        }
      });
    });
  }
  

}
  