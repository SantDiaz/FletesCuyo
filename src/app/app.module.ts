import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { PasosModule } from './folder/fletes/pasos/pasos.module';
import { MapsModule } from './folder/maps/maps.module';
import { HttpClientModule } from '@angular/common/http';
import { Maps2Module } from './folder/maps2/maps2.module';
import { MapsGoogleModule } from './folder/maps-google/mapsGoogle.module';
import { RegisterModule } from './folder/register/register.module';
import { HomeLogModule } from './folder/home-log/home-log.module';
import { ChatModule } from './folder/chat/chat.module';
import { LoginModule } from './folder/login/login.module';
import { AngularFireModule } from '@angular/fire/compat';
import {  environment2 } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AdminModule } from './folder/admin/admin.module';
import { ProfileModule } from './folder/profile/profile.module';



@NgModule({
  declarations: [AppComponent],
  imports: 
  [BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      ComponentsModule,
      PasosModule,
      ProfileModule,
      MapsModule,
      Maps2Module,
      AdminModule,
      HttpClientModule,
      MapsGoogleModule,
      LoginModule,
      RegisterModule,
      HomeLogModule,
      ChatModule,
      AngularFireModule.initializeApp(environment2.firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,

 
      
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
