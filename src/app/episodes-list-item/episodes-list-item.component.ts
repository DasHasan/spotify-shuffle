import {Component, input} from '@angular/core';
import {Episode} from '../model/episode';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-episodes-list-item',
  imports: [
    JsonPipe
  ],
  templateUrl: './episodes-list-item.component.html',
  styles: ``
})
export class EpisodesListItemComponent {
  episode = input.required<Episode>();
}
