import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {JsonPipe} from '@angular/common';
import {map} from 'rxjs';
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

  id = toSignal(
    this.activatedRoute.params.pipe(map(params => params['id']))
  );

  show = toSignal(
    this.spotifyService.getShow(this.id())
  );

  episodes = toSignal(
    this.spotifyService.getEpisodes(this.id())
  );
}
