import {Component, input, output} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {PageInput} from '../../model/page-input';

@Component({
  selector: 'app-paginator',
  imports: [
    MatPaginator
  ],
  templateUrl: './paginator.component.html',
  styles: ``
})
export class PaginatorComponent {
  size = input.required<number>();
  page = input.required<PageInput>();
  pageChange = output<PageEvent>();
}
