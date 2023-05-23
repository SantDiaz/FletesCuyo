import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-paso2-u',
  templateUrl: './paso2-u.component.html',
  styleUrls: ['./paso2-u.component.scss'],
})
export class Paso2UComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  name: string;
  message = "putoss"

  registerU: UserU = {
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
    perfil:  'Usuario',
  }

  constructor(private routes: Router,
    private authS: AuthService,      
    private interaction: InteractionService,    
    private firestore : FirestoreService,    
    private afAuth: AngularFireAuth,
    ) { }


  ngOnInit() {
    // this.onWillDismiss();
  }

  atras(){
    this.routes.navigate(['/registrarse']);
  }


  next(){
    this.routes.navigate(['/registrarse']);
  }
  async siguiente(){
    this.interaction.presentLoading("Registrando...")
    console.log(this.registerU);
    const res = await this.authS.registerU(this.registerU).catch(error =>{
      console.log(error);
      this.interaction.closeLoading();
      this.interaction.presentToast('error')
    })
    if (res) {
      console.log("funciona con exito");
      const path = 'Usuarios'
      const id = res.user.uid;
      this.registerU.uid = id;
      this.registerU.password = null;
      await this.firestore.createDoc(this.registerU, path, id);
      this.interaction.closeLoading();
      await this.interaction.presentToast('registrado con exito');
    this.routes.navigate(['/paso2U']);
    }
  }
  
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      await this.afAuth.signInWithPopup(provider);
      this.routes.navigate(['/home']);
      // El usuario ha iniciado sesión con éxito, puedes redirigirlo a otra página o realizar otras acciones necesarias.
    } catch (error) {
      // Ocurrió un error durante el registro con Google, puedes mostrar un mensaje de error al usuario.
      console.error(error);
    }
  }

    cancel() {
      this.modal.dismiss(null, 'cancel');
    }
  
    confirm() {
      this.modal.dismiss(this.name, 'confirm');
    }
  
    onWillDismiss(event: Event) {
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
      if (ev.detail.role === 'confirm') {
        this.message = `Hello, ${ev.detail.data}!`;
      }
    }

}
