import {Component} from '@angular/core';
import {provideIcons} from '@ng-icons/core';
import {lucideGithub, lucideTwitter} from '@ng-icons/lucide';

@Component({
  selector: 'app-header',
  imports: [],
  providers: [provideIcons({lucideTwitter, lucideGithub})],
  host: {
    class: 'backdrop-blur-sm sticky top-0 z-50 w-full',
  },
  template: `
            Hello
  `,
})
export class Header {

}
