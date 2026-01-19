import {Component, input} from "@angular/core";
import {RouterLink} from "@angular/router";
import ProductPreviewComponent from "./product-preview";
import {StoreCollection} from "@medusajs/types";

@Component({
  selector: 'app-product-rail',
  imports: [ProductPreviewComponent, RouterLink],
  template: `
    <div class="max-w-360 mx-auto px-6 py-12 md:py-24">
      <div class="flex justify-between mb-8 items-center">
        <h2 class="text-base font-medium">{{ collection().title }}</h2>

        <a
          [routerLink]="['/collections', collection().handle]"
          class="text-sm font-medium border-b border-black pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
        >
          View all
        </a>
      </div>

      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
        @for (product of collection().products; track product.id) {
          <li>
            <app-product-preview
              [product]="product"
              [region]="region()"
            />
          </li>
        } @empty {
          <li class="text-neutral-500">No products found</li>
        }
      </ul>
    </div>
  `
})
export default class ProductRailComponent {
  collection = input.required<StoreCollection>();
  region = input.required<any>();
}
