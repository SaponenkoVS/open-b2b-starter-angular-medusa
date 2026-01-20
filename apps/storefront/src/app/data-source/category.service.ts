import {Injectable} from "@angular/core";
import {FindParams, HttpTypes} from "@medusajs/types";
import {sdk} from "../core/medusa-client";

@Injectable()
export class CategoryService {

  async categoryList(query?: FindParams & HttpTypes.StoreCollectionListParams) {
    const { product_categories } = await sdk.store.category.list(query);
    console.log(product_categories);
    return product_categories;
  }

}
