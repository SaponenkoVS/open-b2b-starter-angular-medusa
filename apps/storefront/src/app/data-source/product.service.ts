import {Injectable, resource} from "@angular/core";
import {sdk} from "../core/medusa-client";

@Injectable({providedIn: 'root'})
export class ProductService {

  productList = resource({
    loader: () => sdk.store.product.list()
  });
}
