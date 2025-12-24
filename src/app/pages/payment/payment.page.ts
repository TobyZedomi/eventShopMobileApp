import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonItem, IonList, IonLabel, IonInput } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http'
import { Stripe, PaymentSheetEventsEnum } from '@capacitor-community/stripe';
import { first, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, cartItems } from 'src/app/services/cart';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonItem, IonList, IonLabel, IonInput, CommonModule, FormsModule, RouterModule]
})
export class PaymentPage implements OnInit {

    cart: cartItems[] = [];

  name!: string;
  email!: string;
  amount!: number;
  data: any = {};

constructor(private http: HttpClient, private cartService: Cart, private router: Router) {}


  total = this.cartService.getTotal();

  ngOnInit() {

    this.amount = this.cartService.getTotal();
   
  }



  async paymentSheet() {
    try {
      if (!this.name || !this.email || !this.amount) {
        return
      }
      this.data = {
        name: this.name,
        email: this.email,
        amount: this.cartService.getTotal() * 100,
        currency: 'eur',
      }
    
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });

      
      const data$ = await this.httpPost(this.data);
      const { paymentIntent, customer, ephemeralKey } = await lastValueFrom(data$);
    
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: "Trs"
      });

      
      const result = await Stripe.presentPaymentSheet();
      console.log(result);
      if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
        
        this.router.navigate(['/complete']);
      }
    } catch (error) {
      console.log(error);
    }
  }

   httpPost(body: any) {
    return this.http.post<any>(environment.api+ 'payment-sheet', body).pipe(first());
  }
}
