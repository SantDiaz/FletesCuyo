import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { UserF, datosVehiculo, tipoVehiculo } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { NuevoService } from 'src/app/folder/services/nuevo.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-paso4f',
  templateUrl: './paso4f.component.html',
  styleUrls: ['./paso4f.component.scss'],
})
export class Paso4fComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  name: string;
  message = "putoss";
  selectedPatenteFile: File | null = null;
  dniImage: File | null = null;
  carnetImage: File | null = null;
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
    password: null,
    verificado: false,
    habilitado: false,
    perfil: 'Fletero',
    datosVehiculos: null,
    recomendacion: null,
  };
  Datovehicular: datosVehiculo = {
    uid: null,
    tipoVehiculo: null,
    marca: null,
    modelo: null,
    patente: null,
    imagePatente: null,
    imageDni: null,
    imageCarnet: null,
    imageDniDorzal: null,
    imageCarnetDorzal: null,
    ano: null,
  };

  loading: any;
  vehiculo = tipoVehiculo;

  constructor(
    private routes: Router,
    private authS: AuthService,
    private db: NuevoService,
    private interaction: InteractionService,
    private firestore: FirestoreService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {}

  async takePhoto(imageType: string) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
  
      const imageUrl = image.dataUrl;
      this.uploadImageToStorage(imageUrl, imageType);
    } catch (error) {
      if (error.message.includes('User cancelled photos app')) {
        console.log('El usuario canceló la acción de tomar la foto.');
      } else {
        console.error('Error al tomar la foto:', error);
      }
    }
  }
  

  async uploadImageToStorage(imageDataUrl: string, imageType: string) {
    try {
      const timestamp = new Date().getTime().toString();
      const imageName = `${timestamp}.jpg`;

      const storageRef = this.storage.ref(`images/${imageName}`);
      const uploadTask = await storageRef.putString(imageDataUrl, 'data_url');
      const downloadUrl = await uploadTask.ref.getDownloadURL();

      switch (imageType) {
        case 'profile':
          this.registerF.image = downloadUrl;
          break;
        case 'patente':
          this.Datovehicular.imagePatente = downloadUrl;
          break;
        case 'dni':
          this.Datovehicular.imageDni = downloadUrl;
          break;
        case 'dniDorzal':
          this.Datovehicular.imageDniDorzal = downloadUrl;
          break;
        case 'carnet':
          this.Datovehicular.imageCarnet = downloadUrl;
          break;
        case 'carnetDorzal':
          this.Datovehicular.imageCarnetDorzal = downloadUrl;
          break;
        default:
          console.error('Tipo de imagen desconocido:', imageType);
          break;
      }
    } catch (error) {
      console.error('Error al subir la imagen a Firebase Storage:', error);
    }
  }

  async siguiente() {
    // this.interaction.presentLoading('Guardando datos Vehiculares...');
    this.authS.stateUser<UserF>().subscribe((res) => {
      const path2 = `Fleteros`;
      this.firestore.getDoc<UserF>(path2, res.uid).subscribe((res1) => {
        this.registerF.uid = res.uid;
        console.log("dad", res.uid);
        const path = `Fleteros/${res.uid}/DatosVehiculares`;
        this.firestore.getDoc<datosVehiculo>(path, res.uid).subscribe((res2) => {
          const datosVehicularesConImagen = {
            uid: res2.uid,
            tipoVehiculo: res2.tipoVehiculo,
            marca: res2.marca,
            modelo: res2.modelo,
            patente: res2.patente,
            imageDni: this.Datovehicular.imageDni,
            imageCarnet: this.Datovehicular.imageCarnet,
            imageDniDorzal: this.Datovehicular.imageDniDorzal,
            imageCarnetDorzal: this.Datovehicular.imageCarnetDorzal,
            patenteImage: this.Datovehicular.imagePatente,
            verificado: res1.verificado = true,
          };

          const path3 = `Fleteros/${res.uid}/DatosVehiculares/${res.uid}`;
          this.db.updateDocument(path3, datosVehicularesConImagen).then(() => {
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 0); // Change the delay time as needed
          }).catch(error => {
            console.error('Error al actualizar los datos vehiculares:', error);
          });
        });
      });
    });
  }
}
