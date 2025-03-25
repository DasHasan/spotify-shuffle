import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SpotifyAuthService} from './spotify-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  private readonly spotifyAuthService = inject(SpotifyAuthService);
  private readonly http = inject(HttpClient);

  constructor() {
  }

  getCall(url: string) {
    return this.http.get(`https://api.spotify.com/v1${url}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.spotifyAuthService.getToken().accessToken,
      })
    })
  }
}
