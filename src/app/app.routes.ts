import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [

  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'dashboard', component: Dashboard },
  { path: "", redirectTo: "login", pathMatch: "full"},


];
