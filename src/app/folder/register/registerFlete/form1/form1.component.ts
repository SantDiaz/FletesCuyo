import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserF } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss'],
})
export class Form1Component implements OnInit {

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
  }

  constructor(private routes: Router,
              private authS: AuthService,      
              private interaction: InteractionService,    
              private firestore : FirestoreService,    
              ) { }

  ngOnInit() {}

  atras(){
    this.routes.navigate(['/login']);
  }

  async siguiente(){
    this.interaction.presentLoading("Registrando...")
    console.log(this.registerF);
    const res = await this.authS.registerF(this.registerF).catch(error =>{
      console.log(error);
      this.interaction.closeLoading();
      this.interaction.presentToast('error')
    })
    if (res) {
      // console.log("funciona con exito");
      const path = 'Fleteros'
      const id = res.user.uid;
      this.registerF.uid = id;
      this.registerF.password = null;
      await this.firestore.createDoc(this.registerF, path, id);
      this.interaction.closeLoading();
      await this.interaction.presentToast('registrado con exito');
      this.routes.navigate(['/formF2']);
    }
  }
  



}
