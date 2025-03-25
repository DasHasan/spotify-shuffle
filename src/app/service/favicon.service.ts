import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FaviconService {
  private faviconElement: HTMLLinkElement | null | undefined;
  private originalUrl: string | undefined;

  constructor() {
    this.faviconElement = document.querySelector<HTMLLinkElement>('link[rel*="icon"]');
    this.originalUrl = this.faviconElement?.href;
  }

  setFavicon(url: string) {
    this.faviconElement!.href = url;
  }

  resetFavicon() {
    this.faviconElement!.href = this.originalUrl!;
  }
}
