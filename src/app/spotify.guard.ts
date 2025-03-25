import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SpotifyService} from './spotify.service';
import {map} from 'rxjs';

export const spotifyGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return inject(SpotifyService).isAuthorized().pipe(map(isAuthorized => {
    return isAuthorized ? isAuthorized : router.createUrlTree(
      ['/', 'login'],
      {
        queryParams: {
          redirectTo: state.url
        }
      }
    );
  }));
};
