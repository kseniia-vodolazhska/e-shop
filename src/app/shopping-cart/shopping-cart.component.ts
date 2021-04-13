import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "./shopping-cart.service";
import { ProductModel } from "../product-list/product.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'e-shop-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
  currentStep: number = 1;

  shippingAddressForm: FormGroup = new FormGroup({
    firstName: new FormControl("", { validators: [Validators.required] }),
    lastName: new FormControl("", { validators: [Validators.required] }),
    addressLine1: new FormControl("", { validators: [Validators.required] }),
    addressLine2: new FormControl(""),
    city: new FormControl("", { validators: [Validators.required] }),
    country: new FormControl("", { validators: [Validators.required] }),
    postalCode: new FormControl("", { validators: [Validators.required] }),
    useShippingAddressAsBillingAddress: new FormControl(true)
  });

  billingAddressForm: FormGroup = new FormGroup({
    firstName: new FormControl("", { validators: [Validators.required] }),
    lastName: new FormControl("", { validators: [Validators.required] }),
    addressLine1: new FormControl("", { validators: [Validators.required] }),
    addressLine2: new FormControl(""),
    city: new FormControl("", { validators: [Validators.required] }),
    country: new FormControl("", { validators: [Validators.required] }),
    postalCode: new FormControl("", { validators: [Validators.required] })
  });

  paymentForm: FormGroup = new FormGroup({
    owner: new FormControl("", { validators: [Validators.required] }),
    cardNumber: new FormControl("", { validators: [Validators.pattern(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/)] }),
    expirationDate: new FormControl("", { validators: [Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)] }),
    cvv: new FormControl("", { validators: [Validators.pattern(/^[0-9]{3}$/)] })
  });

  constructor(public shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {
  }

  removeFromCart(product: ProductModel): void {
    const idx = this.shoppingCartService.shoppingCart.products.indexOf(product);

    this.shoppingCartService.shoppingCart.products.splice(idx, 1);
  }

  goToNextStep(): void {
    if (this.currentStep === 4) {
      return;
    }

    if (this.stepChangeAllowed(this.currentStep + 1)) {
      this.currentStep++;
    }
  }

  goToPrevStep(): void {
    if(this.currentStep === 4) {
      return;
    }

    if (this.stepChangeAllowed(this.currentStep - 1)) {
      this.currentStep--;
    }
  }

  clearCart(): void {
    if (this.currentStep === 4) {
      this.shoppingCartService.shoppingCart.clear();
      this.router.navigate(["/"]);
    }
  }

  private stepChangeAllowed(stepIdx: number): boolean {
    switch (stepIdx) {
      case 1: {
        return this.shippingAddressForm.valid && (!this.shippingAddressForm.get("useShippingAddressAsBillingAddress").value ?
          this.billingAddressForm.valid : true);
      }
      case 2: {
        if (this.currentStep > stepIdx) {
          return this.paymentForm.valid
        } else {
         return (this.shoppingCartService.shoppingCart.products.length > 0 &&
           this.shoppingCartService.shoppingCart.products.every(p => p.amount > 0));
        }
      }
      case 3: {
        return this.shippingAddressForm.valid && (!this.shippingAddressForm.get("useShippingAddressAsBillingAddress").value ?
          this.billingAddressForm.valid : true);
      }
      case 4: {
        return this.paymentForm.valid;
      }
    }
  }
}
