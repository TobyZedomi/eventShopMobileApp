import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonBackButton, IonButton, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { Event } from 'src/app/services/event';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/services/cart';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { ModalController } from '@ionic/angular/standalone';
import { Component, ViewChild, ElementRef} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonBackButton, IonButton, IonFab, IonFabButton , CommonModule, FormsModule, RouterModule]
})


export class EventDetailsPage implements OnInit {

  information: any = null;
  price:  number | null = null;
  cartItemCount: BehaviorSubject<number> = new BehaviorSubject(0);


  @ViewChild('cart', {static: false, read: ElementRef})fab!: ElementRef;




  constructor(private activatedRoute: ActivatedRoute, private eventService: Event, private cartService: Cart, private modalCtrl: ModalController) { }

  ngOnInit() {
   const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.cartItemCount = this.cartService.getCartItemCount();


   if(!id){
    return;
   }

   this.eventService.getDetails(id).subscribe(result => {
    console.log('details: ', result);
    this.information = result;
    this.price = this.randomPrice();
   });
  }

   randomPrice() {
    return Math.floor(Math.random() * (200 - 30 + 1) +30);

  }



 addToCart() {

  const event = {
    id: this.information.id,
    name: this.information.name,
    price: this.price!,
    amount: 1,
    image: this.information.images[0].url
  }

    this.cartService.addProduct(event);

    this.animateCSS('tada');
  }


   async openCart() {
    this.animateCSS('bounceOutLeft', true);

    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }


  animateCSS(animationName: string, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)


    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }



}
