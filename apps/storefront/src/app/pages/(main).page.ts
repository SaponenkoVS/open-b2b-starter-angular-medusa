import type {RouteMeta} from '@analogjs/router';
import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {provideIcons} from '@ng-icons/core';
import {lucideArrowRight, lucideStar} from '@ng-icons/lucide';


export const routeMeta: RouteMeta = {
  title: 'app - Cutting-edge tools powering Angular full-stack development',
};

const container = 'mx-auto flex flex-col items-center gap-4 text-center';
const subHeading =
  'text-primary leading-tighter max-w-4xl text-2xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-3xl xl:tracking-tighter';
const lead = 'text-foreground max-w-3xl text-base text-balance sm:text-lg';

@Component({
  selector: 'app-home',
  imports: [],
  providers: [provideIcons({lucideStar, lucideArrowRight})],
  host: {
    class: 'block px-2',
  },
  template: `
    <section class="flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
      Flex
    </section>
  `,
})
export default class MainPage {
  protected readonly _route = inject(ActivatedRoute);
  protected readonly _activeTab = signal<string>(this._route.snapshot.fragment || 'examples');
}
