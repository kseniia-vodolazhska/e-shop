import { Component, OnInit } from '@angular/core';
import { ProductModel } from "./product.model";
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";

@Component({
  selector: 'e-shop-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {
  products: ProductModel[] = [
    {
      id: 1,
      title: "Details Of Aquatic Plants",
      price: 54.2
    },
    {
      id: 2,
      title: "Portable Guide To Mysterious Milestones",
      price: 11.3
    },
    {
      id: 3,
      title: "Infamous Trees",
      price: 17.7
    },
    {
      id: 4,
      title: "Displays Of Spiritual Teleportation",
      price: 93.3
    },
    {
      id: 5,
      title: "Everlasting Curses",
      price: 100.3
    },
    {
      id: 6,
      title: "Uncommon Trees",
      price: 24.5
    },
    {
      id: 7,
      title: "Dangers Of Aquatic Plants",
      price: 33.3
    },
    {
      id: 8,
      title: "Handbook Of Aquatic Flora",
      price: 20.2
    }
  ];

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(product: ProductModel): void {
    product.amount = 1;
    this.shoppingCartService.shoppingCart.products.push(product);
  }

  removeFromCart(product: ProductModel): void {
    const idx = this.shoppingCartService.shoppingCart.products.indexOf(product);

    this.shoppingCartService.shoppingCart.products.splice(idx, 1);
  }

  productIsInCart(product: ProductModel): boolean {
    return this.shoppingCartService.shoppingCart.products.some(p => p == product);
  }
}
