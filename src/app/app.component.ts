import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SpotifyService} from './spotify.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  private readonly spotifyService = inject(SpotifyService);

  constructor() {
    // this.spotifyService.authorize();
    // http://localhost:4200/callback#
    // access_token=BQD9YYl4ohxehlemOaiP3r9eXMZpzvoFKsgucVxnLQ9Rs1hIQjwcN6LE-0X0SXeg0fdDmy_yrdsi6JylFZ1uIy_eyn2pioWli17DSLBMwZ0N0P5IusUE4p_CzHTFpNlrz-1Q4khSprfQWYXlgxdjXF35VpG56qcvY0__1FXOhiUHdccG2N3IwucvYDj1j8WsLUf0obXD7y_Chw
    // token_type=Bearer
    // expires_in=3600
    // state=1a14ed5ef2e93a4e4f0bd4fb345bab29
  }
}
