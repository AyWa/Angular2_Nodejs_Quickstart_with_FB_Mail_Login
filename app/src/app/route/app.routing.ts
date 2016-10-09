import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent }      from '../app.component';
import { AccueilComponent }      from '../accueil/accueil.component';
import { HomeComponent }      from '../home/home.component';
import { LoginComponent }      from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginInGuardService } from '../service_login/login-in-guard.service';
import { FacebookAuthComponent } from '../facebook-auth/facebook-auth.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    component: AccueilComponent
  },{
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginInGuardService]
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'signup',
    component: SignupComponent
  },{
    path: 'auth/facebook/callback/:token',
    component: FacebookAuthComponent
  },{
    path: '**',
    redirectTo: '/accueil'
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
