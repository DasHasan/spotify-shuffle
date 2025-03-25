import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, of} from 'rxjs';
import {SpotifyAuthService} from './spotify-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly http = inject(HttpClient);
  private readonly spotifyAuthService = inject(SpotifyAuthService);

  isAuthorized() {
    return !this.spotifyAuthService.getToken() ? of(false) : this.getMe().pipe(map(me => !!me));
  }

  getMe() {
    return this.http.get(`https://api.spotify.com/v1/me`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.spotifyAuthService.getToken().accessToken,
      })
    })
  }

}
