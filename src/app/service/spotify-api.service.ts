import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SpotifyAuthService} from './spotify-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  private readonly spotifyAuthService = inject(SpotifyAuthService);
  private readonly http = inject(HttpClient);

  constructor() {
  }

  getCall<T>(url: string, params?: HttpParams) {
    return this.http.get<T>(`https://api.spotify.com/v1${url}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.spotifyAuthService.getToken().accessToken,
      }),
      params: params
    })
  }
}
