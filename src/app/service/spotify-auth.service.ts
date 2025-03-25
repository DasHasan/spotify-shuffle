import {Injectable} from '@angular/core';
import {TokenResponse} from '../model/token-response';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private readonly scopes = 'user-read-private user-read-email user-library-read';

  private readonly tokenKey = 'spotify_token';

  saveToken(tokenResponse: TokenResponse) {
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

  openAuthorizeUrl(state: string = ''): void {
    const params = new URLSearchParams({
      response_type: 'token',
      client_id: environment.clientId,
      scope: this.scopes,
      redirect_uri: environment.redirectUri,
      state: state
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

}
