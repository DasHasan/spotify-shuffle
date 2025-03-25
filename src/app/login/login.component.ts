import {Component, inject} from '@angular/core';
import {SpotifyService} from '../spotify.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  private readonly spotifyService = inject(SpotifyService);


  login() {
    this.spotifyService.authorize();
  }
}
