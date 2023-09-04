import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarsePage } from './registrarse.page';
import { Paso1UComponent } from './user/paso1-u/paso1-u.component';
import { Paso1fComponent } from './flete/paso1f/paso1f.component';
import { Paso2UComponent } from './user/paso2-u/paso2-u.component';
import { Paso3UComponent } from './user/paso3-u/paso3-u.component';
import { Paso4UComponent } from './user/paso4-u/paso4-u.component';
import { Paso2FComponent } from './flete/paso2-f/paso2-f.component';
import { Paso3fComponent } from './flete/paso3f/paso3f.component';
import { Paso4fComponent } from './flete/paso4f/paso4f.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrarsePage
  },
  {
    path: 'paso1F',
    component: Paso1fComponent
  },
  {
    path: 'paso2F',
    component: Paso2FComponent,
  },
  {
    path: 'paso3F',
    component: Paso3fComponent,
  },
  {
    path: 'paso4F',
    component: Paso4fComponent,
  },
  {
    path: 'paso1U',
    component: Paso1UComponent
  },
  {
    path: 'paso2U',
    component: Paso2UComponent
  },
  {
    path: 'paso3U',
    component: Paso3UComponent
  },
  {
    path: 'paso4U',
    component: Paso4UComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarsePageRoutingModule {}
