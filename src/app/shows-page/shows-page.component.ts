import {Component, inject} from '@angular/core';
import {SpotifyService} from '../service/spotify.service';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {Page} from '../model/page';
import {ShowEntry} from '../model/show-entry';
import {ShowDetailComponent} from '../show-detail/show-detail.component';

@Component({
  selector: 'app-shows-page',
  imports: [
    AsyncPipe,
    ShowDetailComponent
  ],
  templateUrl: './shows-page.component.html',
  styles: ``
})
export class ShowsPageComponent {
  private readonly spotifyService = inject(SpotifyService);

  showsPage$: Observable<Page<ShowEntry>> = this.spotifyService.getShows();
}
