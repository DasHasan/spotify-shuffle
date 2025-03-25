import {Component, input} from '@angular/core';
import {Episode} from '../model/episode';
import {EpisodesListItemComponent} from '../episodes-list-item/episodes-list-item.component';

@Component({
  selector: 'app-episodes-list',
  imports: [
    EpisodesListItemComponent
  ],
  templateUrl: './episodes-list.component.html',
  styles: ``
})
export class EpisodesListComponent {
  episodes = input.required<Episode[]>();
}
