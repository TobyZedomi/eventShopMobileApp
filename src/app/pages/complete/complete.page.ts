import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText } from '@ionic/angular/standalone';
import { Event } from 'src/app/services/event';
import { RouterModule } from '@angular/router';
import { cartItems, Cart } from 'src/app/services/cart';




@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonText, CommonModule, FormsModule, RouterModule]
})
export class CompletePage implements OnInit {

    cart: cartItems[] = [];
  

  constructor(private eventService: Event, private cartService: Cart) { }

  ngOnInit() {
  }

  async clearCart() {
  
    this.cartService.clear();

    
  }

}
