import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    {path:"", redirectTo:"login", pathMatch:"full"},
    {path:"login", component:Login},
    {path:"home", component:HomeComponent ,canActivate:[authGuard]},
    {path:"dashboard", component:Dashboard}

];
