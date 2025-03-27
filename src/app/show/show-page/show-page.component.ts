import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {SpotifyService} from '../../service/spotify.service';
import {PaginatorComponent} from '../../paginator/paginator/paginator.component';
import {PageInput} from '../../model/page-input';
import {PageEvent} from '@angular/material/paginator';
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from '@angular/material/list';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PageComponent} from '../../page/page.component';
import {NgOptimizedImage} from '@angular/common';
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

  episodes = signal<Episode[] | undefined>(undefined);

  constructor() {
    effect((onCleanup) => {
      this.isLoading.set(true);

      const subscription = this.spotifyService.getEpisodesPage(this.showId(), this.page()).pipe(
        map(episodePage => episodePage.items?.filter(Boolean))
      ).subscribe(episodes => {
        this.episodes.set(episodes);
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
