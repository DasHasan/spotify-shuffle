import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {SpotifyAuthService} from './spotify-auth.service';
import {SpotifyApiService} from './spotify-api.service';
import {Page} from '../model/page';
import {ShowEntry} from '../model/show-entry';
import {PageInput} from '../model/page-input';
import {Show} from '../model/show';
import {EpisodePage} from '../model/episode-page';
import {User} from '../model/user';

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

  getMe(): Observable<User> {
    return this.spotifyApiService.getCall<User>('/me');
  }

  getShows(page: PageInput): Observable<Page<ShowEntry>> {
    return this.spotifyApiService.getCall<Page<ShowEntry>>('/me/shows', page);
  }

  getShow(id: string): Observable<Show> {
    return this.spotifyApiService.getCall<Show>(`/shows/${id}`);
  }

  getEpisodes(episodeId: string, page: PageInput): Observable<EpisodePage> {
    return this.spotifyApiService.getCall<EpisodePage>(`/shows/${episodeId}/episodes`, page);
  }
}
