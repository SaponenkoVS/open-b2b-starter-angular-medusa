import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from "./shared/header/header";
import {Footer} from "./shared/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  host: {
    class: 'bg-background relative z-10 flex min-h-svh flex-col',
  },
  template: `
    <div
      class="pointer-events-none fixed top-0 left-0 z-40 h-[1380px] w-[560px] -translate-y-[350px] -rotate-45 bg-radial-(--spotlight-gradient)"
    ></div>
    <app-header id="app-header"/>
    <main class="flex flex-1 flex-col" id="app-main">
      <router-outlet/>
    </main>
    <app-footer id="app-footer"/>
  `,
})
export class App {
}
