import {Component, input} from '@angular/core';
import {Episode} from '../../model/episode';
import {DatePipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-episode-detail',
  imports: [
    DatePipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon,
    MatCardContent
  ],
  templateUrl: './episode-detail.component.html',
  styles: ``
})
export class EpisodeDetailComponent {
  episode = input.required<Episode>();
}
