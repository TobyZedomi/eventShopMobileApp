import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonList, IonGrid, IonRow, IonCol, IonItem, IonIcon } from '@ionic/angular/standalone';
import { cartItems, Cart } from 'src/app/services/cart';
import { ModalController, AlertController } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router'


@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonList, IonGrid, IonRow, IonCol, IonItem, IonIcon, CommonModule, FormsModule, RouterModule]
})
export class CartModalPage implements OnInit {

  cart: cartItems[] = [];

  constructor(private cartService: Cart, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  decreaseCartItem(event: cartItems) {
    this.cartService.decreaseProduct(event);
  }

  increaseCartItem(event: cartItems) {
    this.cartService.addProduct(event);
  }

  removeCartItem(event: cartItems) {
    this.cartService.removeProduct(event);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async checkout() {
    

    // if cart if empty stay on the same page

    if (this.cart.length === 0) {
      return;
    }

    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Event Order!',
      message: 'You purchased tickets worth £' + this.getTotal() + '. Now time to Purchase event tickets',
      buttons: ['OK']

    });
    //this.cartService.clear();

    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}