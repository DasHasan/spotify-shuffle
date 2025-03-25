import {Component, inject} from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {SpotifyAuthService} from '../spotify-auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly spotifyAuthService = inject(SpotifyAuthService);

  private subscription = new Subscription();

  login() {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(queryParams => {
        const redirectTo = queryParams['redirectTo'] ?? null;
        this.spotifyAuthService.openAuthorizeUrl(redirectTo);
      })
    );
  }
}
