import {Routes} from '@angular/router';
import {spotifyGuard} from './spotify.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    // pathMatch: 'full',
    // redirectTo: 'shows'
  },
  {
    path: 'callback',
    loadComponent: () => import('./auth/callback/callback.component').then(m => m.CallbackComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'user',
    loadComponent: () => import('./user/user-details/user-details.component').then(m => m.UserDetailsComponent),
    canActivate: [spotifyGuard]
  },
  {
    path: 'shows',
    loadComponent: () => import('./show/shows-page/shows-page.component').then(m => m.ShowsPageComponent),
    canActivate: [spotifyGuard]
  },
  {
    path: 'shows/:showId',
    loadComponent: () => import('./show/show-page/show-page.component').then(m => m.ShowPageComponent),
    canActivate: [spotifyGuard]
  },
  {
    path: 'shows/:id/random',
    loadComponent: () => import('./episode/random-episode-page/random-episode-page.component').then(m => m.RandomEpisodePageComponent),
    canActivate: [spotifyGuard]
  },
];
