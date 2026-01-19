import {Injectable} from "@angular/core";
import {sdk} from "../core/medusa-client";
import {FindParams, HttpTypes} from "@medusajs/types";

@Injectable()
export class CollectionService {


  async collectionList(query?: FindParams & HttpTypes.StoreCollectionListParams) {
    const {collections} = await sdk.store.collection.list(query);
    return collections;
  }
}
