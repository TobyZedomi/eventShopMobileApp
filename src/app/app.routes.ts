import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full',
  },
  {
    path: 'events/:id',
    loadComponent: () => import('./pages/event-details/event-details.page').then( m => m.EventDetailsPage)
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events.page').then( m => m.EventsPage)
  },
  {
    path: 'payment',
    loadComponent: () => import('./pages/payment/payment.page').then( m => m.PaymentPage)
  },
  {
    path: 'cart-modal',
    loadComponent: () => import('./pages/cart-modal/cart-modal.page').then( m => m.CartModalPage)
  },
  {
    path: 'complete',
    loadComponent: () => import('./pages/complete/complete.page').then( m => m.CompletePage)
  },
];
