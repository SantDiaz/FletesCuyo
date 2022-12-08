import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form2Component } from './registerFlete/form2/form2.component';
import { Form1Component } from './registerFlete/form1/form1.component';
import { FormUser2Component } from './registerUser/form-user2/form-user2.component';
import { FormUserComponent } from './registerUser/form-user/form-user.component';
import { Form3Component } from './registerFlete/form3/form3.component';
import { IonicModule } from '@ionic/angular';
import { FormUser3Component } from './registerUser/form-user3/form-user3.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RegisterComponent } from './register.component';
// import { HomeLogModule } from '../home-log/home-log.module';



@NgModule({
  declarations: [
    RegisterComponent,
    Form1Component,
    Form2Component,
    Form3Component,
    FormUserComponent,
    FormUser2Component,
    FormUser3Component,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule,
    // HomeLogModule,
    
  ],
  exports: [
    RegisterComponent,
    Form1Component,
    Form2Component,
    Form3Component,
    FormUserComponent,
    FormUser2Component,
    FormUser3Component,
    
  ]
})
export class RegisterModule { }
