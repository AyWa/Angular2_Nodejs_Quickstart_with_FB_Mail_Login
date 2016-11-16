import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent }      from '../app.component';
import { AccueilComponent }      from '../accueil/accueil.component';
import { HomeComponent }      from '../home/home.component';
import { LoginComponent }      from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

import { LoginInGuardService } from '../service_login/login-in-guard.service';
import { BlockUnprotectService } from '../service_login/block-unprotect.service';
import { FacebookAuthComponent } from '../facebook-auth/facebook-auth.component';

//IMPORTANT ! BlockUnprotectservice => block access to some component when the user is connected: like login etc
//LoginInGuardService => block access when the user is not connected

const appRoutes: Routes = [
  //route normal
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },{
    path: 'auth/facebook/callback/:token',
    component: FacebookAuthComponent
  },
  //route blocked when the user is CONNECTED
  {
    path: 'accueil',
    component: AccueilComponent,
    canActivate: [BlockUnprotectService]
  },{
    path: 'login',
    component: LoginComponent,
    canActivate: [BlockUnprotectService]
  },{
    path: 'signup',
    component: SignupComponent,
    canActivate: [BlockUnprotectService]
  },
  //route blocked when the user is NOT CONNECTED
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginInGuardService]
  },
  //if not route defined =>
  {
    path: '**',
    redirectTo: '/home'
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
