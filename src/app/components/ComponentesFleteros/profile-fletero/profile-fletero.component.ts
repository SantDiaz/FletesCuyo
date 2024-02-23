import { Router } from '@angular/router';
import { datosVehiculo, tipoVehiculo, UserF } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-profile-fletero',
  templateUrl: './profile-fletero.component.html',
  styleUrls: ['./profile-fletero.component.scss'],
})
export class ProfileFleteroComponent implements OnInit {
@ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;


  login: boolean = false;
  DatosF: UserF;
  DatosG: UserF;
  DatosV: datosVehiculo;


  constructor(  private auth: AuthService,
                private router: Router,
                private db: FirestoreService,) { }  

  ngOnInit(
    
  ) {     
    this.auth.stateUser<UserF>().subscribe( res  => {
      if (res) {
        this.login = true;
        this.getDatosVehicular(res.uid);
        this.getDatosG(res.uid)
      } else {
        this.login = false;
         this.router.navigate(['/login'])
        
      }   
 })
}


getDatosG(uid: string) {
  const path = `Fleteros`;
  const id = uid;
  
  this.db.getDoc<UserF>(path, id).subscribe( res => {
    if (res ) {
      this.DatosF = res;
      // console.log('id personal -> ', uid);
      // console.log('trae esto-->', res );
      // console.log('datos vehicular'  
      }
      else{
        // console.log('Tiene errores -> ');
      }
  })
}


getDatosVehicular(uid: string) {
  const path = `Fleteros/${uid}/DatosVehiculares`;
  const id = uid;
  
  this.db.getDoc<datosVehiculo>(path, id).subscribe( res => {
    if (res ) {
      this.DatosV = res;
      // console.log('trae esto vehicular-->', res );
      }
      else{
        // console.log('Tiene errores -> ');
      }
  })
}

handleFileInput(event: Event): void {
    this.auth.stateUser<UserF>().subscribe( res  => {
    if (res) {
  const file = (event.target as HTMLInputElement).files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const imageData = reader.result as string;
    // Redimensionar imagen
    this.resizeImage(imageData, 800, 600, (resizedImage) => {
      // Actualizar solo el campo 'image' en el documento
      const path = `Fleteros`;
      const dataToUpdate = { image: resizedImage };
      this.db.updateDoc(path, res.uid, dataToUpdate)
        .then(() => {
          console.log('Imagen actualizada correctamente');
          // Actualizar la URL de la imagen en la vista
          this.DatosF.image = resizedImage;
        })
        .catch(error => {
          console.error('Error al actualizar la imagen:', error);
        });
    });
  };

  if (file) {
    reader.readAsDataURL(file);
  }
   }   
})
}

resizeImage(imageData: string, maxWidth: number, maxHeight: number, callback: (resizedImage: string) => void): void {
  const img = new Image();
  img.src = imageData;
  img.onload = () => {
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    const resizedImage = canvas.toDataURL('image/jpeg');
    callback(resizedImage);
  };
}
// handleFileInput(event: Event): void {

//   const file = (event.target as HTMLInputElement).files[0];
//   const reader = new FileReader();

//   reader.onload = () => {
//     const imageData = reader.result as string;
//     // Actualizar solo el campo 'image' en el documento del fletero
//     const dataToUpdate = { image: imageData };
//     this.db.updateDoc(path, res.uid, dataToUpdate)
//       .then(() => {
//         console.log('Imagen actualizada correctamente para el fletero');
//       })
//       .catch(error => {
//         console.error('Error al actualizar la imagen para el fletero:', error);
//       });
//   };

//   if (file) {
//     reader.readAsDataURL(file);
//   }
// }   
// })
// }

openFileInput(): void {
  this.fileInput.nativeElement.click();
}



}
