import {Component, input} from '@angular/core';
import {Show} from '../model/show';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-show-detail',
  imports: [
    JsonPipe
  ],
  templateUrl: './show-detail.component.html',
  styles: ``
})
export class ShowDetailComponent {
  show = input.required<Show>();
}
