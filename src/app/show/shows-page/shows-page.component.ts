import {Component, inject, signal} from '@angular/core';
import {SpotifyService} from '../../service/spotify.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {switchMap, tap} from 'rxjs';
import {Page} from '../../model/page';
import {ShowEntry} from '../../model/show-entry';
import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {PageInput} from '../../model/page-input';
import {NgOptimizedImage} from '@angular/common';
import {PageComponent} from '../../page/page.component';

@Component({
  selector: 'app-shows-page',
  imports: [
    PaginatorComponent,
    MatListItem,
    MatNavList,
    MatListItemTitle,
    MatListItemIcon,
    RouterLink,
    NgOptimizedImage,
    PageComponent
  ],
  templateUrl: './shows-page.component.html',
  styles: ``
})
export class ShowsPageComponent {
  private readonly spotifyService = inject(SpotifyService);

  isLoading = signal(false);

  page = signal<PageInput>({
    limit: 10,
    offset: 0,
    index: 0,
  });

  showsPage = toSignal<Page<ShowEntry> | undefined>(
    toObservable(this.page).pipe(
      tap(_ => this.isLoading.set(true)),
      switchMap(page => this.spotifyService.getShows(page)),
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
