import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { defineCustomElements } from 'stripe-pwa-elements/loader';
import { addIcons } from 'ionicons';
import{
  musicalNotes,
  football,
  ticket,
  videocam,
  pricetagOutline,
  locationOutline,
  cashOutline,
  addCircle,
  close,
  closeCircle,
  removeCircle,
  cart,
  reorderFour,
  filmOutline,
  peopleOutline,
  starOutline,
} from 'ionicons/icons'
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; 
addIcons({
  'musical-notes': musicalNotes,
  'football': football,
  'ticket': ticket,
  'videocam': videocam,
  'pricetag-outline': pricetagOutline,
  'location-outline': locationOutline,
  'cash-outline': cashOutline,
  'add-circle': addCircle,
  'close': close,
  'close-circle': closeCircle,
  'remove-circle': removeCircle,
  'cart': cart,
  'reorder-four': reorderFour,
  'film-outline': filmOutline,
  'people-outline': peopleOutline,
  'star-outline': starOutline

})

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
  ],
}).then(() => defineCustomElements(window))
  .catch(err => console.log(err));;
