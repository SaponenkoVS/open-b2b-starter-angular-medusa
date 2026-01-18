import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from "./shared/header/header";
import {Footer} from "./shared/footer/footer";
import {RouteMeta} from "@analogjs/router";
import {metaWith} from "./shared/meta/meta.util";


export const routeMeta: RouteMeta = {
  meta: metaWith(
    'Medusa Angular Starter Template',
    'A starter template for building e-commerce applications using Medusa and Angular.',
  ),
  title: 'Medusa Angular Starter Template',
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  host: {
    class: 'bg-background relative z-10 flex min-h-svh flex-col',
  },
  template: `
    <div
      class="pointer-events-none fixed top-0 left-0 z-40 h-345 w-140 -translate-y-87.5 -rotate-45 bg-radial-(--spotlight-gradient)"></div>
    <app-header id="app-header"/>
    <main class="flex flex-1 flex-col" id="app-main">
      <router-outlet/>
    </main>
    <app-footer id="app-footer"/>
  `,
})
export class App {

}
