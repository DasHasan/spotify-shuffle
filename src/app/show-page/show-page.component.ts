import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {JsonPipe} from '@angular/common';
import {map, switchMap} from 'rxjs';
import {SpotifyService} from '../service/spotify.service';
import {EpisodesListComponent} from '../episodes-list/episodes-list.component';

@Component({
  selector: 'app-show-page',
  imports: [
    JsonPipe,
    EpisodesListComponent
  ],
  templateUrl: './show-page.component.html',
  styles: ``
})
export class ShowPageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly spotifyService = inject(SpotifyService);

  page = signal({
    offset: 0,
    limit: 10
  });

  id = toSignal(
    this.activatedRoute.params.pipe(map(params => params['id']))
  );

  show = toSignal(
    this.spotifyService.getShow(this.id())
  );

  episodes = toSignal(
    toObservable(this.page).pipe(
      switchMap(page => this.spotifyService.getEpisodes(this.id(), page))
    )
  );

  nextPage() {
    this.page.update(page => ({
      offset: page.offset + page.limit,
      limit: page.limit
    }))
  }
}
