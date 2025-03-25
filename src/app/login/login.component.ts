import {Component, inject} from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly spotifyService = inject(SpotifyService);

  private subscription = new Subscription();

  login() {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(queryParams => {
        const redirectTo = queryParams['redirectTo'] ?? null;
        this.spotifyService.openAuthorizeUrl(redirectTo);
      })
    );
  }
}
