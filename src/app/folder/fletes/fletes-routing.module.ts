import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { ChatComponent } from '../chat/chat.component';
import { HomeLogComponent } from '../homeF/home-log.component';
import { LoginComponent } from '../login/login.component';
import { MapsGoogleComponent } from '../maps-google/maps-google.component';
import { LoadingComponent } from '../maps/components/loading/loading.component';
import { MapViewComponent } from '../maps/components/map-view/map-view.component';
import { MapScreenComponent } from '../maps/screens/map-screen/map-screen.component';
import { Screen2Component } from '../maps2/screen2/screen2.component';
import { ProfileComponent } from '../profile/profile.component';
import { RegisterComponent } from '../register/register.component';
import { Form1Component } from '../register/registerFlete/form1/form1.component';
import { Form2Component } from '../register/registerFlete/form2/form2.component';
import { Form3Component } from '../register/registerFlete/form3/form3.component';
import { FormUserComponent } from '../register/registerUser/form-user/form-user.component';
import { FormUser2Component } from '../register/registerUser/form-user2/form-user2.component';
import { FormUser3Component } from '../register/registerUser/form-user3/form-user3.component';
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



const uidAdmin = 'fsfPU1AMSwUBihOXISnw6ZBFeun1'; 
const onlyAdmin = () => map((user: any) => !!user && user.uid  === uidAdmin); 


const User = 'Fletero'
const onlyUser = () => map((user: any) => !!user && user.uid  === User); 
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
    path: 'paso2',
    component: Paso2Component
  },
  {
    path: 'paso3',
    component: Paso3Component
  },
  {
    path: 'maps',
    component: MapScreenComponent
  },
  {
    path: 'loading',
    component: LoadingComponent
  },
  {
    path: 'map-view',
    component: MapViewComponent
  },
  {
    path: 'maps2',
    component: Screen2Component
  },
  {
    path: 'mapsGoogle',
    component: MapsGoogleComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'formF1',
    component: Form1Component,
  },
  {
    path: 'formF2',
    component: Form2Component, canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'formF3',
    component: Form3Component, canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'formUser1',
    component: FormUserComponent,
  },
  {
    path: 'formUser2',
    component: FormUser2Component,canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'formUser3',
    component: FormUser3Component,canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'chat',
    component: ChatComponent, ...canActivate(onlyUser) 
  },
  {
    path: 'admin',
    component: AdminComponent, ...canActivate(onlyAdmin) 
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
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FletesPageRoutingModule {

}
