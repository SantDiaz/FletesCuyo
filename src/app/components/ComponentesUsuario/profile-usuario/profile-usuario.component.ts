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
  DatosU: UserU
  DatosG: UserU

  constructor(  private auth: AuthService,
                private router: Router,
                private db: FirestoreService,) { }  

  ngOnInit(
    
  ) {     
    this.auth.stateUser<UserU>().subscribe( res  => {
      if (res) {
        this.login = true;
        this.getDatosUser(res.uid);
        this.getDatosGmail(res.uid);
      } else {
        this.login = false;
         this.router.navigate(['/login'])
        
      }   
 })
}




getDatosUser(uid: string) {
  const path = `Usuarios/${uid}/DatosPersonales`;
  const id = uid;
  
  this.db.getDoc<UserU>(path, id).subscribe( res => {
    if (res ) {
      this.DatosU = res;
      // console.log('id personal -> ', uid);
      // console.log('trae esto-->', res );
      }
      else{
        console.log('Tiene errores -> ');
      }
  })
}

getDatosGmail(uid: string) {
  const path = `Usuarios/${uid}`;
  const id = uid;
  
  this.db.getDoc<UserU>(path, id).subscribe( res => {
    if (res ) {
      this.DatosG = res;
      // console.log('id personal -> ', uid);
      // console.log('trae esto-->', res );
      }
      else{
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
    // Actualizar solo el campo 'image' en el documento
    const path = `Usuarios/${this.DatosU.uid}/DatosPersonales`;
    const dataToUpdate = { image: imageData };
    this.db.updateDoc(path, this.DatosU.uid, dataToUpdate)
      .then(() => {
        console.log('Imagen actualizada correctamente');
      })
      .catch(error => {
        console.error('Error al actualizar la imagen:', error);
      });
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}



// cambiarFoto(){
//   this.auth.stateUser<UserU>().subscribe( res  => {
//     if (res) {
//   const path = `Usuarios/${res.uid}/DatosPersonales`;
//   const id = res.uid;
  
//   this.db.getDoc<UserU>(path, id).subscribe( res2 => {
//     if (res ) {
//       this.DatosU = res2;
//       const data = res2.image;
      
//       const enlace = `Usuarios/DatosPersonales`;
//       this.db.updateDoc(enlace, res.uid, data)

//       }
//       else{
//         console.log('Tiene errores -> ');
//       }
//   })
// }   
// })
// }

}
