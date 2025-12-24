import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface cartItems {
  id: number;
  name: string;
  price: number;
  amount: number;
  image: string;
}
@Injectable({
  providedIn: 'root'
})
export class Cart {
 

  private cart: cartItems[] = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() {}

  getProducts() {
    return this.cart;
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(events: cartItems) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === events.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      events.amount = 1;
      this.cart.push(events);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(events: cartItems) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === events.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(events: cartItems) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === events.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  clear() {
    this.cart = [];
    this.cartItemCount.next(0);
  }


}