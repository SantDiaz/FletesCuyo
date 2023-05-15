import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapScreenComponent } from './folder/maps/screens/map-screen/map-screen.component';
import { Form1Component } from './folder/register/registerFlete/form1/form1.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./folder/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'fletes',
    loadChildren: () => import('./folder/fletes/fletes.module').then( m => m.FletesPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./folder/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'paso1F2',
    loadChildren: () => import('./folder/registrarse/user/user.module').then( m => m.UserModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
