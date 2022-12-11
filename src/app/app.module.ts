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
@NgModule({
  declarations: [AppComponent],
  imports: 
  [BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      ComponentsModule,
      PasosModule,
      MapsModule,
      Maps2Module,
      HttpClientModule,
      MapsGoogleModule,
      RegisterModule,
      HomeLogModule,
      ChatModule,
      
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
