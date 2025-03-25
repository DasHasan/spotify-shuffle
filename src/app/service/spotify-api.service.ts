import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {SpotifyAuthService} from './spotify-auth.service';
import {PageInput} from '../model/page-input';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  private readonly spotifyAuthService = inject(SpotifyAuthService);
  private readonly http = inject(HttpClient);

  constructor() {
  }

  getCall<T>(url: string, params?: PageInput | { [p: string]: number | string }) {
    return this.http.get<T>(`https://api.spotify.com/v1${url}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.spotifyAuthService.getToken().accessToken,
      }),
      params: new HttpParams({
        fromObject: params as any
      })
    })
  }
}
