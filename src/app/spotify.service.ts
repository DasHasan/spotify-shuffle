import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, of} from 'rxjs';
import {TokenResponse} from './token-response.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly http = inject(HttpClient);

  private readonly clientId = 'e21572e92eb5440baecb4f6f60090a69';
  private readonly redirectUri = 'http://localhost:4200/callback';
  private readonly tokenKey = 'spotify_token';

  saveToken(tokenResponse: TokenResponse) {
    console.log(tokenResponse);
    localStorage.setItem(
      this.tokenKey,
      JSON.stringify(tokenResponse)
    );
  }

  getToken(): TokenResponse {
    const itemValue = localStorage.getItem(
      this.tokenKey
    );

    return !itemValue ? null : JSON.parse(itemValue);
  }

  isAuthorized() {
    const authKey = localStorage.getItem(this.tokenKey);
    return !authKey ? of(false) : this.getMe().pipe(map(me => !!me));
  }

  openAuthorizeUrl(state: string = ''): void {
    const scope = 'user-read-private user-read-email';

    const params = new URLSearchParams({
      response_type: 'token',
      client_id: this.clientId,
      scope: scope,
      redirect_uri: this.redirectUri,
      state: state
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  getMe() {
    return this.http.get(`https://api.spotify.com/v1/me`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken().accessToken,
      })
    })
  }

}
