import {Component, input} from '@angular/core';
import {Show} from '../model/show';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-show-list-item',
  imports: [
    RouterLink
  ],
  templateUrl: './show-list-item.component.html',
  styles: ``
})
export class ShowListItem {
  show = input.required<Show>();
}
