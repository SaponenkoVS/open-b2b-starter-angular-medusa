import {Component, effect, inject, input, resource} from "@angular/core";
import ProductRailComponent from "../../(products)/products/product-rail";
import {CollectionService} from "../../../data-source/collection.service";


@Component({
  selector: 'app-featured-products',
  imports: [ProductRailComponent],
  providers: [CollectionService],
  template: `
    @if (collectionsResource.isLoading()) {
      <div class="flex items-center justify-center p-20">
        <div class="w-6 h-6 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin"></div>
      </div>
    }

    @if (collectionsResource.value(); as data) {
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
    } @else if (!collectionsResource.isLoading()) {
      <div class="p-10 text-center bg-neutral-100">No collections found.</div>
    }
  `
})
export default class FeaturedProductsComponent {
  countryCode = input<string>('us');
  collectionService = inject(CollectionService);
  collectionsResource = resource({
    loader: () => this.collectionService.collectionList({ limit: 3 , title: 'Featured', fields: '*products' }),
  });

  constructor() {
    effect(() => {
      const data = this.collectionsResource.value();
      const error = this.collectionsResource.error();

      if (data) {
        console.log('Данные загружены:', data);
      }

      if (error) {
        console.error('Ошибка ресурса:', error);
      }
    });
  }
}
