import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {map, switchMap} from 'rxjs';
import {SpotifyService} from '../../service/spotify.service';
import {EpisodesListComponent} from '../../episodes/episodes-list/episodes-list.component';
import {NavbarComponent} from '../../navbar/navbar/navbar.component';
import {PaginatorComponent} from '../../paginator/paginator/paginator.component';

@Component({
  selector: 'app-show-page',
  imports: [
    EpisodesListComponent,
    NavbarComponent,
    PaginatorComponent,
  ],
  templateUrl: './show-page.component.html',
  styles: ``
})
export class ShowPageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly spotifyService = inject(SpotifyService);

  page = signal({
    offset: 0,
    limit: 10,
    page: 1,
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
    this.page.update(page => ({
      offset: page.offset + page.limit,
      limit: page.limit,
      page: page.page + 1,
    }))
  }
}
