import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HomeComponent } from './home/home.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SignupComponent } from './signup/signup.component';
import { FacebookAuthComponent } from './facebook-auth/facebook-auth.component';

import { routing } from './route/app.routing';
import { LoginInGuardService } from './service_login/login-in-guard.service';
import { UserService } from './service_login/user.service';
import { ProfilService } from './service_utilisateurs/profil.service';
import { HttpClient } from './service_login/http-client.service';


import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AccueilComponent,
    SignupComponent,
    TopbarComponent,
    FacebookAuthComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [LoginInGuardService,UserService,HttpClient,ProfilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
