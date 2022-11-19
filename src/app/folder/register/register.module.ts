import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form2Component } from './registerFlete/form2/form2.component';
import { Form1Component } from './registerFlete/form1/form1.component';
import { FormUser2Component } from './registerUser/form-user2/form-user2.component';
import { FormUserComponent } from './registerUser/form-user/form-user.component';



@NgModule({
  declarations: [
    Form1Component,
    Form2Component,
    FormUserComponent,
    FormUser2Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Form1Component,
    Form2Component,
    FormUserComponent,
    FormUser2Component
    
  ]
})
export class RegisterModule { }
