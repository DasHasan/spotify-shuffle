import {Component, computed, effect, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SpotifyAuthService} from '../../service/spotify-auth.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {PageComponent} from '../../page/page.component';

@Component({
  selector: 'app-callback',
  imports: [
    PageComponent
  ],
  templateUrl: './callback.component.html',
  styles: ``
})
export class CallbackComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly spotifyAuthService = inject(SpotifyAuthService);

  activatedRouteFragment = toSignal(this.activatedRoute.fragment);

  params = computed(() => new URLSearchParams(this.activatedRouteFragment()!))

  tokenResponse = computed(() => ({
    accessToken: this.params().get('access_token')!,
    tokenType: this.params().get('token_type')!,
    expiresIn: this.params().get('expires_in')!,
    state: this.params().get('state')!,
  }));

  constructor() {
    effect(() => {
      this.spotifyAuthService.saveToken(this.tokenResponse());

      const redirect = this.tokenResponse().state === null ? '/' : this.tokenResponse().state;
      this.router.navigate([redirect]);
    });
  }

}
