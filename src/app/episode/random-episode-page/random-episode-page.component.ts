import {Component, effect, inject} from '@angular/core';
import {SpotifyService} from '../../service/spotify.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {Episode} from '../../model/episode';
import {MatIcon} from '@angular/material/icon';
import {MatIconAnchor} from '@angular/material/button';
import {Title} from '@angular/platform-browser';
import {FaviconService} from '../../service/favicon.service';
import {PageComponent} from '../../page/page.component';
import {EpisodeDetailComponent} from '../episode-detail/episode-detail.component';
import {Platform} from '@angular/cdk/platform';

@Component({
    selector: 'app-random-episode-page',
    imports: [
        MatIcon,
        MatIconAnchor,
        PageComponent,
        EpisodeDetailComponent
    ],
    templateUrl: './random-episode-page.component.html',
    styles: ``
})
export class RandomEpisodePageComponent {
    private readonly title = inject(Title);
    private readonly platform = inject(Platform);
    private readonly faviconService = inject(FaviconService);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly spotifyService = inject(SpotifyService);

    showId = toSignal(this.activatedRoute.params.pipe(map(params => params['showId'])));

    randomEpisode = toSignal<Episode>(
        this.spotifyService.getRandomEpisode(this.showId())
    );

    constructor() {
        effect((onCleanup) => {

            if (this.randomEpisode()) {
                this.faviconService.setFavicon(this.randomEpisode()?.images![0].url!)
                this.title.setTitle(this.randomEpisode()?.name!);

                if (this.platform.ANDROID) {
                    window.open(this.randomEpisode()?.uri, '_blank');
                }
            }

            onCleanup(() => {
                this.faviconService.resetFavicon();
                this.title.setTitle('Spotify Shuffle');
            });
        });
    }
}
