import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { ChatComponent } from '../chat/chat.component';
import { HomeLogComponent } from '../homeF/home-log.component';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { FletesPage } from './fletes.page';
import { Paso1Component } from './pasos/paso1/paso1.component';
import { Paso2Component } from './pasos/paso2/paso2.component';
import { Paso3Component } from './pasos/paso3/paso3.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { map } from 'rxjs/operators';
import { canActivate } from '@angular/fire/compat/auth-guard';
import { UserF } from 'src/app/folder/models/models';
import { pipe } from 'rxjs';
import { customClaims } from '@angular/fire/compat/auth-guard';
import { HomeUserComponent } from 'src/app/components/ComponentesUsuario/home-user/home-user.component';
import { FletesDisComponent } from './fletes-dis/fletes-dis.component';
import { CardComponent } from './fletes-dis/card/card.component';
import { ProfileUsuarioComponent } from 'src/app/components/ComponentesUsuario/profile-usuario/profile-usuario.component';
import { PreciosComponent } from './pasos/precios/precios.component';
import { RegistrarsePage } from '../registrarse/registrarse.page';
// import { Paso1fComponent } from '../registrarse/flete/paso1f/paso1f.component';
import { Paso1UComponent } from '../registrarse/user/paso1-u/paso1-u.component';
import { Paso2UComponent } from '../registrarse/user/paso2-u/paso2-u.component';
import { Paso3UComponent } from '../registrarse/user/paso3-u/paso3-u.component';
import { Paso4UComponent } from '../registrarse/user/paso4-u/paso4-u.component';
import { IniciarAppComponent } from 'src/app/components/ComponentesFleteros/iniciar-app/iniciar-app.component';



// const uidAdmin = 'fsfPU1AMSwUBihOXISnw6ZBFeun1'; 
// const onlyAdmin = () => map((user: any) => !!user && user.uid  === uidAdmin); 


// const User = 'Fletero'
// const onlyUser = () => map((user: any) => !!user && user.uid  === User); 
// const onlyUser = () => map((user: any) => !!user && uidUser  === User); 




const routes: Routes = [
  {
    path: '',
    component: FletesPage
  },
  {
    path: 'paso1',
    component: Paso1Component
  },
  {
    path: 'iniciarApp',
    component: IniciarAppComponent
  },
  
  {
    path: 'paso2',
    component: Paso2Component
  },
  {
    path: 'paso3',
    component: Paso3Component
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  
  {
    path: 'regi',
    component: RegistrarsePage,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'chat',
    component: ChatComponent, 
  },
  {
    path: 'admin',
    component: AdminComponent, 
    // ...canActivate(onlyAdmin) 
  },
  {
    path: 'profile',
    component: ProfileComponent, canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'homeUser',
    component: HomeUserComponent, canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'profile-User',
    component: ProfileUsuarioComponent, canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'fletesDis',
    component: FletesDisComponent, canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'card',
    component: CardComponent, canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'precios',
    component: PreciosComponent, canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'home2',
    component: HomeLogComponent, 
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FletesPageRoutingModule {

}