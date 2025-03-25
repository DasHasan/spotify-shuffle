import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {SpotifyService} from './spotify.service';

export const spotifyGuard: CanActivateFn = (route, state) => {
  return inject(SpotifyService).isAuthorized();
};
