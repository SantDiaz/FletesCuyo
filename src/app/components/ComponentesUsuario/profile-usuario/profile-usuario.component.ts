import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';

@Component({
  selector: 'app-profile-usuario',
  templateUrl: './profile-usuario.component.html',
  styleUrls: ['./profile-usuario.component.scss'],
})
export class ProfileUsuarioComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  filter: string = "filtro";
  login: boolean = false;
  DatosU: UserU;
  DatosG: UserU;

  constructor(
    private auth: AuthService,
    private router: Router,
    private db: FirestoreService,
  ) { }  

  ngOnInit() {     
    this.auth.stateUser<UserU>().subscribe(res  => {
      if (res) {
        this.login = true;
        this.getDatosUser(res.uid);
        this.getDatosGmail(res.uid);
      } else {
        this.login = false;
        this.router.navigate(['/login']);
      }   
    })
  }

  getDatosUser(uid: string) {
    const path = `Usuarios/${uid}/DatosPersonales`;
    const id = uid;

    this.db.getDoc<UserU>(path, id).subscribe(res => {
      if (res) {
        this.DatosU = res;
      } else {
        console.log('Tiene errores -> ');
      }
    })
  }

  getDatosGmail(uid: string) {
    const path = `Usuarios/`;
    const id = uid;

    this.db.getDoc<UserU>(path, id).subscribe(res => {
      if (res) {
        this.DatosG = res;
      } else {
        console.log('Tiene errores -> ');
      }
    })
  }

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result as string;
      // Redimensionar imagen
      this.resizeImage(imageData, 800, 600, (resizedImage) => {
        // Actualizar solo el campo 'image' en el documento
        const path = `Usuarios/${this.DatosU.uid}/DatosPersonales`;
        const dataToUpdate = { image: resizedImage };
        this.db.updateDoc(path, this.DatosU.uid, dataToUpdate)
          .then(() => {
            console.log('Imagen actualizada correctamente');
            // Actualizar la URL de la imagen en la vista
            this.DatosU.image = resizedImage;
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
}
