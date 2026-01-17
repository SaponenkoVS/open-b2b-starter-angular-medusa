import {Component} from "@angular/core";

@Component({
  selector: 'app-footer',
  imports: [],
  host: {
    class: 'block px-4 py-6',
  },
  template: `
    <footer class="mx-auto max-w-screen-xl text-center text-sm">
      Development powered by Saponenka Uladzislau.
    </footer>
  `,
})
export class Footer {
}
