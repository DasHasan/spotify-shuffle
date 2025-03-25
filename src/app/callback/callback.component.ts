import {Component, inject, OnInit} from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-callback',
  imports: [
    RouterLink
  ],
  templateUrl: './callback.component.html',
  styles: ``
})
export class CallbackComponent implements OnInit {
  private subscription = new Subscription();

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly spotifyService = inject(SpotifyService);

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.fragment.subscribe(params => {
        const urlSearchParams = new URLSearchParams(params!);

        const tokenResponse = {
          accessToken: urlSearchParams.get('access_token')!,
          tokenType: urlSearchParams.get('token_type')!,
          expiresIn: urlSearchParams.get('expires_in')!,
          state: urlSearchParams.get('state')!,
        };
        this.spotifyService.saveToken(tokenResponse);

        if (tokenResponse.state) {
          this.router.navigate([tokenResponse.state]);
        }

      })
    );
  }
}
