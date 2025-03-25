import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageComponent} from '../../page/page.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {JsonPipe} from '@angular/common';
import {SpotifyService} from '../../service/spotify.service';

@Component({
  selector: 'app-episode-page',
  imports: [
    PageComponent,
    JsonPipe
  ],
  templateUrl: './episode-page.component.html',
  styles: ``
})
export class EpisodePageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly spotifyService = inject(SpotifyService);

  episodeId = toSignal(this.activatedRoute.params.pipe(map(params => params['episodeId'])));

  episode = toSignal(
    this.spotifyService.getEpisode(this.episodeId())
  )
}
