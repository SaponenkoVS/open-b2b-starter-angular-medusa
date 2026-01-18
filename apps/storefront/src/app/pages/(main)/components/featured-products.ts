import { Component, input, resource } from "@angular/core";
import {ProductRailComponent} from "../../(products)/products/product-rail";

const MOCK_COLLECTIONS = [
  {
    id: "coll_1",
    title: "Portable Bestsellers",
    handle: "portable-bestsellers",
    products: [
      {
        id: "prod_1",
        title: "E-Reader Paperwhite",
        handle: "e-reader",
        thumbnail: "https://v5.medusajs.com/_next/image?url=https%3A%2F%2Fmedusa-public-images.s3.eu-west-1.amazonaws.com%2Freader.png&w=1080&q=75",
        variants: [{ inventory_quantity: 10 }]
      },
      {
        id: "prod_2",
        title: "Wireless Headphones",
        handle: "headphones",
        thumbnail: "https://v5.medusajs.com/_next/image?url=https%3A%2F%2Fmedusa-public-images.s3.eu-west-1.amazonaws.com%2Fheadphones.png&w=1080&q=75",
        variants: [{ inventory_quantity: 100 }]
      },
      {
        id: "prod_3",
        title: "Smart Watch Series 9",
        handle: "smart-watch",
        thumbnail: "https://v5.medusajs.com/_next/image?url=https%3A%2F%2Fmedusa-public-images.s3.eu-west-1.amazonaws.com%2Fwatch.png&w=1080&q=75",
        variants: [{ inventory_quantity: 0 }]
      },
      {
        id: "prod_4",
        title: "Bluetooth Speaker",
        handle: "speaker",
        thumbnail: "https://v5.medusajs.com/_next/image?url=https%3A%2F%2Fmedusa-public-images.s3.eu-west-1.amazonaws.com%2Fspeaker.png&w=1080&q=75",
        variants: [{ inventory_quantity: 45 }]
      }
    ]
  }
];

@Component({
  selector: 'app-featured-products',
  imports: [ProductRailComponent, ProductRailComponent],
  template: `
    @if (productsResource.isLoading()) {
      <div class="flex items-center justify-center p-20">
        <div class="w-6 h-6 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin"></div>
      </div>
    }

    @if (productsResource.value(); as data) {
      <ul class="flex flex-col gap-x-6 bg-neutral-100">
        @for (collection of data; track collection.id) {
          <li>
            <app-product-rail
              [collection]="collection"
              [region]="'us'"
            />
          </li>
        }
      </ul>
    } @else if (!productsResource.isLoading()) {
      <div class="p-10 text-center bg-neutral-100">No collections found.</div>
    }
  `
})
export default class FeaturedProductsComponent {
  countryCode = input<string>('us');

  productsResource = resource({
    loader: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return MOCK_COLLECTIONS;
    }
  });
}
