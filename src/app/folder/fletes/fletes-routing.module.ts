import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingComponent } from '../maps/components/loading/loading.component';
import { MapViewComponent } from '../maps/components/map-view/map-view.component';
import { MapScreenComponent } from '../maps/screens/map-screen/map-screen.component';
import { Screen2Component } from '../maps2/screen2/screen2.component';
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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FletesPageRoutingModule {}
