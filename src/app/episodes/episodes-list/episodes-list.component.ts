import {Component, input} from '@angular/core';
import {Episode} from '../../model/episode';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-episodes-list',
  imports: [
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './episodes-list.component.html',
  styles: ``
})
export class EpisodesListComponent {
  episodes = input.required<Episode[]>();
}
