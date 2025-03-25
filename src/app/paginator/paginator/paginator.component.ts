import {Component, input, output, signal} from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styles: ``
})
export class PaginatorComponent {
  page = input.required<number>();
  prevPage = output();
  nextPage = output();
}
