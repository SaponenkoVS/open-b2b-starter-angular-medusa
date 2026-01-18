import {Component, input} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-preview',
  imports: [RouterLink],
  template: `
    <a [routerLink]="['/products']" class="group block">
            Product Preview Component
    </a>
  `
})
export default class ProductPreviewComponent {
  product = input.required<any>();
  region = input.required<any>();
}
