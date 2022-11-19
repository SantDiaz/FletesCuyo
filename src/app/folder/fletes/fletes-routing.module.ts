import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLogComponent } from '../home-log/home-log.component';
import { LoginComponent } from '../login/login.component';
import { MapsGoogleComponent } from '../maps-google/maps-google.component';
import { LoadingComponent } from '../maps/components/loading/loading.component';
import { MapViewComponent } from '../maps/components/map-view/map-view.component';
import { MapScreenComponent } from '../maps/screens/map-screen/map-screen.component';
import { Screen2Component } from '../maps2/screen2/screen2.component';
import { RegisterComponent } from '../register/register.component';
import { Form1Component } from '../register/registerFlete/form1/form1.component';
import { Form2Component } from '../register/registerFlete/form2/form2.component';
import { FletesPage } from './fletes.page';
import { Paso1Component } from './pasos/paso1/paso1.component';
import { Paso2Component } from './pasos/paso2/paso2.component';
import { Paso3Component } from './pasos/paso3/paso3.component';

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
    path: 'home2',
    component: HomeLogComponent,
  },
  {
    path: 'formF1',
    component: Form1Component,
  },
  {
    path: 'formF2',
    component: Form2Component,
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FletesPageRoutingModule {}
