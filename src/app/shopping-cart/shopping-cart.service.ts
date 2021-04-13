import { ShoppingCartModel } from "./shopping-cart.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ShoppingCartService {
  shoppingCart: ShoppingCartModel = new ShoppingCartModel();
}
