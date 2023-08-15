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
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
    //   this.onWillDismiss(ev)
  }

  atras(){
    this.routes.navigate(['/registrarse']);
  }


  next(){
    this.routes.navigate(['/registrarse']);
  }

  async siguiente() {
    await this.interaction.presentLoading("Registrando...");
  
    try {
      await this.authS.registerF(this.registerF);
      console.log("Registro exitoso");
      this.interaction.closeLoading();
      this.modal.dismiss(null, 'cancel');
      this.router.navigate(['/paso2F']);
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
