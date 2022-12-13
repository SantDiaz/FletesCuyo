import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/folder/models/models';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {

  registerU: UserI = {
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

  constructor(private routes: Router) { }

  ngOnInit() {}

  atras(){
    this.routes.navigate(['/login']);
  }

  siguiente(){
    this.routes.navigate(['/formUser2']);
    console.log(this.registerU);
  }

}
