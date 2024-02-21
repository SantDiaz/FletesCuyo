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
  recordarContrasena: boolean = false;

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
  
  redi(){
    this.router.navigate(['/registrarse']);
  }

  async login() {
    await this.interaction.presentLoading("Ingresando...");
    
    try {
      const res = await this.auth.login(this.credenciales.email, this.credenciales.password);
      
      if (res) {
        this.interaction.closeLoading();
        await this.interaction.presentToast("Ingresado con éxito");
  
        // Guardar la contraseña si la casilla está marcada
        if (this.recordarContrasena) {
          localStorage.setItem('email', this.credenciales.email);
          localStorage.setItem('password', this.credenciales.password);
        } else {
          // Si la casilla no está marcada, elimina las credenciales almacenadas previamente
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
  
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error(error);
      this.interaction.closeLoading();
      this.interaction.presentToast("Usuario o Contraseña inválidos");
    }
  }
  
  toggleRecordarContrasena(checked: boolean) {
    this.recordarContrasena = checked;
  }


}
