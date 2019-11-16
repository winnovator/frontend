import { JWTToken } from './models/jwttoken';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GlobalHttpInterceptorService } from './services/globalhttpinterceptorservice.service';

export function TokenGetter() {
  let jwt: JWTToken;
  if (localStorage.getItem('jwttoken') !== null) {
    jwt = JSON.parse(localStorage.getItem('jwttoken'));
    return jwt.token;
  } else {
    return '';
  }
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  // tslint:disable-next-line:max-line-length
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    JwtModule.forRoot({
      config: {
        tokenGetter: TokenGetter,
        whitelistedDomains: ['localhost:44344', 'winnovator-acc.owntournament.org'],
        blacklistedRoutes: ['http://localhost:44344/api/token', 'https://winnovator-acc.owntournament.org/api/token']
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true },
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
