import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import {SpotifyAuthService} from './spotify-auth.service';
import {SpotifyApiService} from './spotify-api.service';
import {Page} from '../model/page';
import {ShowEntry} from '../model/show-entry';
import {PageInput} from '../model/page-input';
import {Show} from '../model/show';
import {EpisodePage} from '../model/episode-page';
import {User} from '../model/user';
import {RandomUtil} from '../random-util';
import {Episode} from '../model/episode';

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

  getEpisodesPage(showId: string, page: PageInput): Observable<EpisodePage> {
    return this.spotifyApiService.getCall<EpisodePage>(`/shows/${showId}/episodes`, page);
  }

  getEpisode(episodeId: string): Observable<Episode> {
    return this.spotifyApiService.getCall<Episode>(`/episodes/${episodeId}`);
  }

  getRandomEpisode(showId: string) {
    return this.getShow(showId).pipe(
      switchMap(
        showPage => this.getEpisodesPage(showPage.id, {
          limit: 1,
          offset: RandomUtil.getSecureRandomNumber(showPage.total_episodes)
        })
      ),

      map(episodePage => episodePage.items![0]),
    )
  }

}
