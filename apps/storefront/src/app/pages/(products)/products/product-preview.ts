import {Component, computed, input} from "@angular/core";
import {RouterLink} from "@angular/router";
import {NgClass, NgOptimizedImage} from '@angular/common';
import {HttpTypes} from '@medusajs/types';
import PreviewAddToCartComponent from "./product-preview-add-to-cart";

@Component({
  selector: 'app-product-preview',
  imports: [RouterLink, NgClass, PreviewAddToCartComponent, NgOptimizedImage, PreviewAddToCartComponent],
  template: `
    @if (product()) {
      <a [routerLink]="['/products', product().handle]" class="group block">
        <div
          class="flex flex-col gap-4 relative aspect-3/5 w-full overflow-hidden p-4 bg-white shadow-borders-base rounded-lg group-hover:shadow-[0_0_0_4px_rgba(0,0,0,0.1)] transition-shadow ease-in-out duration-150"
        >
          <div class="w-full h-full p-10 flex items-center justify-center bg-neutral-50">
            <div class="relative w-full overflow-hidden aspect-square">
              <img [ngSrc]="product().thumbnail!" [alt]="product().title" class="object-contain max-h-full" fill>
            </div>
          </div>

          <div class="flex flex-col text-sm font-medium">
            <span class="text-neutral-600 text-[10px] uppercase tracking-wider">Brand</span>
            <span class="text-ui-fg-base truncate">{{ product().title }}</span>
          </div>

          <div class="flex flex-col gap-0">
            @if (cheapestPrice()) {
              <span class="text-lg font-semibold">{{ cheapestPrice().calculated_price }}</span>
            }
            <span class="text-neutral-600 text-[0.6rem]">Excl. VAT</span>
          </div>

          <div class="flex justify-between items-center">
            <div class="flex flex-row gap-1 items-center">
              <span [ngClass]="inventoryStatus().color" class="text-xl leading-none">•</span>
              <span class="text-neutral-600 text-xs">
                {{ inventoryStatus().quantity }} left
              </span>
            </div>

            <app-preview-add-to-cart
              [product]="product()"
              [region]="region()"
            />
          </div>
        </div>
      </a>
    }
  `
})
export default class ProductPreviewComponent {
  product = input.required<HttpTypes.StoreProduct>();
  region = input.required<HttpTypes.StoreRegion>();
  isFeatured = input<boolean>(false);

  inventoryStatus = computed(() => {
    const qty = this.product().variants?.reduce((acc, variant) => {
      return acc + (variant?.inventory_quantity || 0);
    }, 0) || 0;

    let color = 'text-red-500';
    if (qty > 50) color = 'text-green-500';
    else if (qty > 0) color = 'text-orange-500';

    return {quantity: qty, color};
  });

  cheapestPrice = computed(() => {
    return (this.product().variants?.[0] as any)?.price || null;
  });
}
