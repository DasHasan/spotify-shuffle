import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    MatToolbar,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  title = input<string>();
}
