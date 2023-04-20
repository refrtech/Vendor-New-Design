import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
// tap, swipe, pan, pinch, press, and rotate
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
