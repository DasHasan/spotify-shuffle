import {Component, inject} from '@angular/core';
import {SpotifyService} from '../../service/spotify.service';
import {JsonPipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {PageComponent} from '../../page/page.component';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-user-details',
  imports: [
    JsonPipe,
    PageComponent,
    MatCard,
    MatIcon
  ],
  templateUrl: './user-details.component.html',
  styles: ``
})
export class UserDetailsComponent {
  private readonly spotifyService = inject(SpotifyService);

  user = toSignal(this.spotifyService.getMe());
}
