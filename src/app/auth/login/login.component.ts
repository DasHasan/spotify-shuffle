import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {SpotifyAuthService} from '../../service/spotify-auth.service';
import {MatButton} from '@angular/material/button';
import {PageComponent} from '../../page/page.component';

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    PageComponent
  ],
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
