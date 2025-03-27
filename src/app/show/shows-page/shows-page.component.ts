import {Component, effect, inject, signal} from '@angular/core';
import {SpotifyService} from '../../service/spotify.service';
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

  showsPage = signal<Page<ShowEntry> | undefined>(undefined);

  constructor() {
    effect((onCleanup) => {
      this.isLoading.set(true);

      const subscription = this.spotifyService.getShows(this.page()).subscribe(showsPage => {
        this.showsPage.set(showsPage);
        this.isLoading.set(false);
      });

      onCleanup(() => {
        subscription.unsubscribe();
      });
    });
  }

  loadPage({pageIndex, pageSize}: PageEvent) {
    this.page.set({
      limit: pageSize,
      offset: pageSize * pageIndex,
      index: pageIndex
    });
  }
}
