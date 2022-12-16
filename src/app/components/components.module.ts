import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TabsUComponent } from './tabs-u/tabs-u.component';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeUserComponent } from './ComponentesUsuario/home-user/home-user.component';
import { AnunciosComponent } from './ComponentesUsuario/anuncios/anuncios.component';
import { HomeFleteroComponent } from './ComponentesFleteros/home-fletero/home-fletero.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TabsUComponent,
    HomeUserComponent,
    AnunciosComponent,
    HomeFleteroComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    TabsUComponent,
    HomeUserComponent,
    AnunciosComponent,
    HomeFleteroComponent,
  ], 
})
export class ComponentsModule { }
