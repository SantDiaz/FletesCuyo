import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { PasosModule } from './folder/fletes/pasos/pasos.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeLogModule } from './folder/homeF/home-log.module';
import { ChatModule } from './folder/chat/chat.module';
import { LoginModule } from './folder/login/login.module';
import { AngularFireModule } from '@angular/fire/compat';
import {  environment2 } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFirestoreModule } from '@angular//firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AdminModule } from './folder/admin/admin.module';
import { ProfileModule } from './folder/profile/profile.module';
import { FletesDisComponent } from './folder/fletes/fletes-dis/fletes-dis.component';
import { RegistrarsePageModule } from './folder/registrarse/registrarse.module';
import { FletesPageModule } from './folder/fletes/fletes.module';
import { UserModule } from './folder/registrarse/user/user.module';
import { FleteModule } from './folder/registrarse/flete/flete.module';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent],
  imports: 
  [BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      ComponentsModule,
      PasosModule,
      ProfileModule,
      AdminModule,
      HttpClientModule,
      LoginModule,
      HomeLogModule,
      ChatModule,
      FleteModule,
      ReactiveFormsModule,
      AngularFireModule.initializeApp(environment2.firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      RegistrarsePageModule,
      // FletesPageModule,
      UserModule,
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
