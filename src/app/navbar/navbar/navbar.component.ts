import {Component, input, TemplateRef} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    MatToolbar,
    MatIcon,
    MatIconButton,
    NgTemplateOutlet
  ],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  title = input<string | null | undefined>('Spotify Shuffle');
  showBack = input<boolean>();
  extra = input<TemplateRef<any>>();
}
