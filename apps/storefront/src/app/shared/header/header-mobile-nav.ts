import {Component, signal} from '@angular/core';
import {provideIcons} from '@ng-icons/core';
import {lucideMenu, lucideX} from '@ng-icons/lucide';

@Component({
  selector: 'app-mobile-nav',
  imports: [],
  providers: [provideIcons({lucideMenu, lucideX})],
  template: `
  `,
})
export class HeaderMobileNav {
  protected readonly _isOpen = signal(false);

  protected _toggleOpen(): void {
    this._isOpen.update((open) => !open);
  }

  protected _closePopover(): void {
    this._isOpen.set(false);
  }
}
