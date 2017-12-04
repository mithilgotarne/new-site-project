import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

declare var $: any;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/ngsw-worker.js') ;
  }
  $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
    localStorage.setItem("user_info",JSON.stringify(data));
  });
});
