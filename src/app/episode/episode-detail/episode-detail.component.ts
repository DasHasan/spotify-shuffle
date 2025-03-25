import {Component, input} from '@angular/core';
import {Episode} from '../../model/episode';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-episode-detail',
  imports: [
    DatePipe
  ],
  templateUrl: './episode-detail.component.html',
  styles: ``
})
export class EpisodeDetailComponent {
  episode = input.required<Episode>();
}
