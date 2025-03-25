import {Component, inject, Signal, signal} from '@angular/core';
import {SpotifyService} from '../service/spotify.service';
import {JsonPipe} from '@angular/common';
import {ShowDetailComponent} from '../show-detail/show-detail.component';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {switchMap} from 'rxjs';
import {Page} from '../model/page';
import {ShowEntry} from '../model/show-entry';

@Component({
  selector: 'app-shows-page',
  imports: [
    ShowDetailComponent,
    JsonPipe
  ],
  templateUrl: './shows-page.component.html',
  styles: ``
})
export class ShowsPageComponent {
  private readonly spotifyService = inject(SpotifyService);

  page = signal({
    limit: 10,
    offset: 0
  });

  showsPage: Signal<Page<ShowEntry> | undefined> = toSignal(
    toObservable(this.page).pipe(
      switchMap(page => this.spotifyService.getShows(page))
    )
  );

  nextPage() {
    this.page.update(({limit, offset}) => ({
      limit: limit,
      offset: offset + limit
    }));
  }
}
