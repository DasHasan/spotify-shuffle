import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

}
