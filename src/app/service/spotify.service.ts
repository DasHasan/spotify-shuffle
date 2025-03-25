import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {SpotifyAuthService} from './spotify-auth.service';
import {SpotifyApiService} from './spotify-api.service';
import {Page} from '../model/page';
import {ShowEntry} from '../model/show-entry';
import {PageInput} from '../model/page-input';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private readonly spotifyApiService = inject(SpotifyApiService);
  private readonly spotifyAuthService = inject(SpotifyAuthService);

  isAuthorized() {
    return !this.spotifyAuthService.getToken() ? of(false) : this.getMe().pipe(
      catchError(() => of(false)),
      map(me => !!me)
    );
  }

  getMe() {
    return this.spotifyApiService.getCall<{}>('/me');
  }

  getShows(page: PageInput = {limit: 20, offset: 0}): Observable<Page<ShowEntry>> {
    return this.spotifyApiService.getCall<Page<ShowEntry>>('/me/shows', page);
  }
}
