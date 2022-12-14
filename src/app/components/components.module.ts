import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TabsUComponent } from './tabs-u/tabs-u.component';

import { TabsFComponent } from './tabs-f/tabs-f.component';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    HeaderComponent,
    TabsUComponent,
    TabsFComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    TabsUComponent,
    TabsFComponent,
  ], 
})
export class ComponentsModule { }
