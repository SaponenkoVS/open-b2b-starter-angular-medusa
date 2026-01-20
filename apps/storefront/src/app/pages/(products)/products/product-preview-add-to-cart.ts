import {Component, input, signal, inject} from '@angular/core';
import {HttpTypes} from '@medusajs/types';
import {CartEventBusService} from "../../../core/cart-event-bus.service";

@Component({
  selector: 'app-preview-add-to-cart',
  template: `
    <button
      (click)="handleAddToCart($event)"
      [disabled]="isAdding()"
      class="rounded-full p-3 border-none shadow-none bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 flex items-center justify-center"
    >
      @if (isAdding()) {
        <div class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
      } @else {
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      }
    </button>
  `
})
export default class PreviewAddToCartComponent {
  private eventBus = inject(CartEventBusService);
  product = input.required<HttpTypes.StoreProduct>();
  region = input.required<HttpTypes.StoreRegion>();
  isAdding = signal(false);

  async handleAddToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const variantId = this.product().variants?.[0]?.id;
    if (!variantId) return;

    this.isAdding.set(true);

    this.eventBus.emitCartAdd({
      lineItems: [
        {
          productVariant: {
            ...this.product().variants?.[0],
            product: this.product(),
          },
          quantity: 1,
        },
      ],
      regionId: this.region().id,
    });

    this.isAdding.set(false);
  }
}
