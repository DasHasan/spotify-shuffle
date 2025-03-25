import {Component, inject} from '@angular/core';
import {SpotifyService} from '../service/spotify.service';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {tap} from 'rxjs';

@Component({
  selector: 'app-shows-page',
  imports: [
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './shows-page.component.html',
  styles: ``
})
export class ShowsPageComponent {
  private readonly spotifyService = inject(SpotifyService);

  shows$ = this.spotifyService.getShows().pipe(tap(console.log))
}
