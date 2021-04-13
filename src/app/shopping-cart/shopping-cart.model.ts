import { AddressInfoModel } from "./address-info.model";
import { PaymentInfoModel } from "./payment-info.model";
import { ProductModel } from "../product-list/product.model";

export class ShoppingCartModel {
  products?: ProductModel[];
  shippingAddress?: AddressInfoModel;
  billingAddress?: AddressInfoModel;
  payment?: PaymentInfoModel;

  constructor() {
    this.products = [];
  }

  clear(): void {
    this.products = [];
    this.shippingAddress = new AddressInfoModel();
    this.billingAddress = new AddressInfoModel();
    this.payment = new PaymentInfoModel();
  }
}
