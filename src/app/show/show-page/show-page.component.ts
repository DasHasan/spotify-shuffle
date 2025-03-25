import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {map, switchMap, tap} from 'rxjs';
import {SpotifyService} from '../../service/spotify.service';
import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {PageInput} from '../../model/page-input';
import {PageEvent} from '@angular/material/paginator';
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from '@angular/material/list';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PageComponent} from '../../page/page.component';
import {JsonPipe, NgOptimizedImage} from '@angular/common';
import {Episode} from '../../model/episode';

@Component({
  selector: 'app-show-page',
  imports: [
    PaginatorComponent,
    MatListItemTitle,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatIconButton,
    MatIcon,
    RouterLink,
    PageComponent,
    NgOptimizedImage,
    JsonPipe,
  ],
  templateUrl: './show-page.component.html',
  styles: ``
})
export class ShowPageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly spotifyService = inject(SpotifyService);

  isLoading = signal<boolean>(true);

  page = signal<PageInput>({
    offset: 0,
    limit: 10,
    index: 1,
  });

  showId = toSignal(
    this.activatedRoute.params.pipe(map(params => params['showId']))
  );

  show = toSignal(
    this.spotifyService.getShow(this.showId())
  );

  episodes = toSignal<Episode[] | undefined>(
    toObservable(this.page).pipe(
      tap(_ => this.isLoading.set(true)),

      switchMap(page => this.spotifyService.getEpisodesPage(this.showId(), page).pipe(
        map(episodePage => episodePage.items?.filter(Boolean))
      )),

      tap(_ => this.isLoading.set(false)),
    )
  );

  loadPage({pageIndex, pageSize}: PageEvent) {
    this.page.set({
      limit: pageSize,
      offset: pageSize * pageIndex,
      index: pageIndex
    });
  }
}
