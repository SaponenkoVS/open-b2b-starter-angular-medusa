import {Injectable} from "@angular/core";
import {sdk} from "../core/medusa-client";

@Injectable()
export class CollectionService {


  async collectionList(limit = 3) {
    const {collections} = await sdk.store.collection.list(
      {limit},
    );
    return collections;
  }
}
