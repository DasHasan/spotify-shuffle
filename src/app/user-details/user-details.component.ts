import {Component, inject, OnInit, signal} from '@angular/core';
import {SpotifyService} from '../spotify.service';
import {Subscription} from 'rxjs';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [
    JsonPipe
  ],
  templateUrl: './user-details.component.html',
  styles: ``
})
export class UserDetailsComponent implements OnInit {
  user = signal<{} | null>(null);

  private subscription = new Subscription();
  private readonly spotifyService = inject(SpotifyService);

  ngOnInit() {
    this.subscription.add(
      this.spotifyService.getMe().subscribe(me => this.user.set(me))
    );
  }
}
