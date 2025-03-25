import {Component, input, TemplateRef} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NavbarComponent} from '../navbar/navbar/navbar.component';

@Component({
  selector: 'app-page',
  imports: [
    MatProgressSpinner,
    NavbarComponent
  ],
  templateUrl: './page.component.html',
  styles: ``
})
export class PageComponent {
  loading = input<boolean>(false);

  title = input<string | null | undefined>('Spotify Shuffle');
  showBack = input<boolean>();
  extra = input<TemplateRef<any>>();
}
