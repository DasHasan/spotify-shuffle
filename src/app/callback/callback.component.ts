import {Component, inject, OnInit} from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
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
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly spotifyService = inject(SpotifyService);

  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.fragment.subscribe(params => {
        const urlSearchParams = new URLSearchParams(params!);

        this.spotifyService.saveToken({
          accessToken: urlSearchParams.get('access_token')!,
          tokenType: urlSearchParams.get('token_type')!,
          expiresIn: urlSearchParams.get('expires_in')!,
          state: urlSearchParams.get('state')!,
        });
      })
    );
  }
}
