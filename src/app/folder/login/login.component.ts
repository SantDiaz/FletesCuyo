import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  credenciales = {
    email: null,
    password: null,
  }

  constructor( private auth: AuthService,
               private interaction: InteractionService,        
               private router: Router,       ) { }

  ngOnInit() {}


  user(){
    this.router.navigate(['/formUser1']);
  }

  fletero(){
    this.router.navigate(['/formF1']);
  }

  async login(){
    await this.interaction.presentLoading("Ingresando...");
    console.log(this.credenciales);
    const res = await this.auth.login(this.credenciales.email, this.credenciales.password).catch(error => {
      console.log(error);
      this.interaction.closeLoading();
      this.interaction.presentToast("Usuario o Contraseña invalidos");
    })
    if(res){
      // console.log("res ==>",res);
      this.interaction.closeLoading();
      await this.interaction.presentToast("Ingresado con exito");
      this.router.navigate(['/home']);
    }
  }




}
