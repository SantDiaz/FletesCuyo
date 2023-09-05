import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { UserF } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-paso1f',
  templateUrl: './paso1f.component.html',
  styleUrls: ['./paso1f.component.scss'],
})
export class Paso1fComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  name: string;
  message = "putoss"

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
    perfil:  'Fletero',
    datosVehiculos: null,
  }

  constructor(private routes: Router,
    private authS: AuthService,      
    private interaction: InteractionService,    
    private firestore : FirestoreService,    
    private router: Router,
    ) { }


  ngOnInit() {
    this.registerF = {
      uid: '',
      nombre: '',
      apellido: '',
      dni: '',
      edad: '',
      domicilio: '',
      telefono: '',
      image: '',
      perfil: 'Fletero'  ,
      email: '',
      password: '',
      habilitado: false,
      verificado: false,
      datosVehiculos: null,
    };
  
  }

  volver(){
    this.routes.navigate(['/registrarse']);
  }

  customEmailValidator(value: string): { [key: string]: any } | null {
    if (!value || !value.includes('@') || !value.includes('.')) {
      return { customEmailError: true };
    }
    return null;
  }

  customPasswordValidator(value: string): { [key: string]: any } | null {
    if (!value || value.length < 8 || !/[A-Z]/.test(value)) {
      return { customPasswordError: true };
    }
    return null;
  }

  next(){
    this.routes.navigate(['/registrarse']);
  }


  async siguiente() {
    await this.interaction.presentLoading("Registrando...");
  
    if (this.customEmailValidator(this.registerF.email)) {
      this.interaction.closeLoading();
      this.interaction.presentToast('El correo electrónico no es válido.');
      return;
    }
  
    // Validación de contraseña
    if (this.customPasswordValidator(this.registerF.password)) {
      this.interaction.closeLoading();
      this.interaction.presentToast('La contraseña no cumple con los requisitos.');
      return;
    }
  
    // Si tanto el correo electrónico como la contraseña son válidos, continuar con el registro
    try {
      await this.authS.registerF(this.registerF);
      console.log("Registro exitoso");
      this.interaction.closeLoading();
      this.router.navigate(['/paso2U']);
      // Resto del código...
    } catch (error) {
      console.log(error);
      this.interaction.closeLoading();
      this.interaction.presentToast('Error en el registro');
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
