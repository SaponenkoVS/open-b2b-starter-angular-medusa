import type {RouteMeta} from '@analogjs/router';
import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {provideIcons} from '@ng-icons/core';
import {lucideArrowRight, lucideStar} from '@ng-icons/lucide';
import {HeroComponent} from "./(main)/components/hero";
import FeaturedProductsComponent from "./(main)/components/featured-products";
import {metaWith} from "../shared/meta/meta.util";


export const routeMeta: RouteMeta = {
  meta: metaWith(
    'Medusa Angular Starter Template',
    'A starter template for building e-commerce applications using Medusa and Angular.',
  ),
  title: 'Medusa Angular Starter Template',
};

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    FeaturedProductsComponent
  ],
  providers: [provideIcons({lucideStar, lucideArrowRight})],
  host: {
    class: 'block px-2',
  },
  template: `
    <div class="flex flex-col gap-y-2 m-2">
      <app-hero />
      <app-featured-products countryCode={countryCode} />
    </div>
  `,
})
export default class MainPage {
  protected readonly _route = inject(ActivatedRoute);
  protected readonly _activeTab = signal<string>(this._route.snapshot.fragment || 'examples');
}
