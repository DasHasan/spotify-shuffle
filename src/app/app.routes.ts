import {Routes} from '@angular/router';
import {spotifyGuard} from './spotify.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    // canActivate: [spotifyGuard]
  },
  {
    path: 'callback',
    loadComponent: () => import('./callback/callback.component').then(m => m.CallbackComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'user',
    loadComponent: () => import('./user-details/user-details.component').then(m => m.UserDetailsComponent),
  },
];
