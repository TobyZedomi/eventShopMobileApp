import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonItem, IonLabel, IonIcon,
  IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard,
  IonButtons, IonBackButton, IonButton,
  IonFab, IonFabButton
} from '@ionic/angular/standalone';

import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ProductsService } from 'src/app/services/products.service';
import { Cart } from 'src/app/services/cart';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonIcon,
    IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard,
    IonButtons, IonBackButton, IonButton,
    IonFab, IonFabButton,
    CommonModule, FormsModule
  ]
})
export class ProductDetailsPage implements OnInit {

  product: any = null;
  cartItemCount: BehaviorSubject<number> = new BehaviorSubject(0);

  @ViewChild('cart', { static: false, read: ElementRef }) fab!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: Cart,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.cartItemCount = this.cartService.getCartItemCount();

    if (!id) {
      return;
    }

    // DummyJSON product by id
    this.productsService.getProductById(Number(id)).subscribe(result => {
      this.product = result;
    });
  }

  addToCart() {
    if (!this.product) return;

    const item = {
      id: this.product.id,
      name: this.product.title,
      price: this.product.price,
      amount: 1,
      image: this.product.thumbnail
    };

    this.cartService.addProduct(item);
    this.animateCSS('tada');
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);

    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });

    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCSS('bounceInLeft');
    });

    await modal.present();
  }

  animateCSS(animationName: string, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }

    node.addEventListener('animationend', handleAnimationEnd);
  }
}
