import type {RouteMeta} from '@analogjs/router';
import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  host: {
    class: 'block',
  },
  template: `
    <div class="flex flex-col">
      <app-hero></app-hero>
      <app-featured-products countryCode={countryCode}></app-featured-products>
    </div>
  `,
})
export default class MainPage {
  protected readonly _route = inject(ActivatedRoute);
}
