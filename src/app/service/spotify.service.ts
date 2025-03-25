import {inject, Injectable} from '@angular/core';
import {map, of} from 'rxjs';
import {SpotifyAuthService} from './spotify-auth.service';
import {SpotifyApiService} from './spotify-api.service';
import {HttpParams} from '@angular/common/http';
import {Page} from '../model/page';
import {ShowEntry} from '../model/show-entry';

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
    return this.spotifyApiService.getCall<{}>('/me');
  }

  getShows() {
    return this.spotifyApiService.getCall<Page<ShowEntry>>('/me/shows', new HttpParams({
        fromObject: {
          limit: 20,
          offset: 0
        }
      })
    );
  }
}
