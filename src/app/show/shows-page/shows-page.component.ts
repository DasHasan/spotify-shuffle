import {Component, inject, Signal, signal} from '@angular/core';
import {SpotifyService} from '../../service/spotify.service';
import {ShowListItem} from '../show-list-item/show-list-item.component';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {switchMap} from 'rxjs';
import {Page} from '../../model/page';
import {ShowEntry} from '../../model/show-entry';
import {NavbarComponent} from '../../navbar/navbar/navbar.component';
import {PaginatorComponent} from '../../paginator/paginator/paginator.component';

@Component({
  selector: 'app-shows-page',
  imports: [
    ShowListItem,
    NavbarComponent,
    PaginatorComponent
  ],
  templateUrl: './shows-page.component.html',
  styles: ``
})
export class ShowsPageComponent {
  private readonly spotifyService = inject(SpotifyService);

  page = signal({
    limit: 10,
    offset: 0,
    page: 1,
  });

  showsPage: Signal<Page<ShowEntry> | undefined> = toSignal(
    toObservable(this.page).pipe(
      switchMap(page => this.spotifyService.getShows(page))
    )
  );

  prevPage() {
    if (this.page().page == 1) {
      return
    }
    this.page.update(({limit, offset, page}) => ({
      limit: limit,
      offset: offset - limit,
      page: page - 1,
    }));
  }

  nextPage() {
    this.page.update(({limit, offset, page}) => ({
      limit: limit,
      offset: offset + limit,
      page: page + 1
    }));
  }
}
