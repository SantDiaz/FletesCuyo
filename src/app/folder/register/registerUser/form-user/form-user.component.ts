import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  UserU } from 'src/app/folder/models/models';
import { AuthService } from 'src/app/folder/services/auth.service';
import { FirestoreService } from 'src/app/folder/services/firestore.service';
import { InteractionService } from 'src/app/folder/services/interaction.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {

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
    ) { }


  ngOnInit() {}

  atras(){
    this.routes.navigate(['/login']);
  }


  // async siguiente(){
  //   this.interaction.presentLoading("Registrando...")
  //   console.log(this.registerU);
  //   const res = await this.authS.registerU(this.registerU).catch(error =>{
  //     console.log(error);
  //     this.interaction.closeLoading();
  //     this.interaction.presentToast('error')
  //   })
  //   if (res) {
  //     console.log("funciona con exito");
  //     const path = 'Usuarios'
  //     const id = res.user.uid;
  //     this.registerU.uid = id;
  //     this.registerU.password = null;
  //     await this.firestore.createDoc(this.registerU, path, id);
  //     this.interaction.closeLoading();
  //     await this.interaction.presentToast('registrado con exito');
  //   this.routes.navigate(['/paso2U']);
  //   }
  // }
  
  

}
