import {inject, Injectable} from '@angular/core';
import {map, of} from 'rxjs';
import {SpotifyAuthService} from './spotify-auth.service';
import {SpotifyApiService} from './spotify-api.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly spotifyApiService = inject(SpotifyApiService);
  private readonly spotifyAuthService = inject(SpotifyAuthService);

  isAuthorized() {
    return !this.spotifyAuthService.getToken() ? of(false) : this.getMe().pipe(map(me => !!me));
  }

  getMe() {
    return this.spotifyApiService.getCall('/me');
  }

  getShows() {
    return this.spotifyApiService.getCall('/me/shows');
  }
}
