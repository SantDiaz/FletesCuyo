import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TabsUComponent } from './tabs-u/tabs-u.component';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeUserComponent } from './ComponentesUsuario/home-user/home-user.component';
import { AnunciosComponent } from './ComponentesUsuario/anuncios/anuncios.component';
import { HomeFleteroComponent } from './ComponentesFleteros/home-fletero/home-fletero.component';
import { ProfileUsuarioComponent } from './ComponentesUsuario/profile-usuario/profile-usuario.component';
import { ProfileFleteroComponent } from './ComponentesFleteros/profile-fletero/profile-fletero.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    TabsUComponent,
    HomeUserComponent,
    AnunciosComponent,
    HomeFleteroComponent,
    ProfileFleteroComponent,
    ProfileUsuarioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    TabsUComponent,
    HomeUserComponent,
    AnunciosComponent,
    HomeFleteroComponent,
    ProfileFleteroComponent,
    ProfileUsuarioComponent,
  ], 
})
export class ComponentsModule { }
