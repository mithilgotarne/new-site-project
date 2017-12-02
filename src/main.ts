import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import * as firebase from 'firebase/app';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

firebase.initializeApp({
  apiKey: "AIzaSyAUr2dzwNmpT11i8qnRxnroPGN0BfeNSKE",
  authDomain: "amit-ghoda.firebaseapp.com",
  databaseURL: "https://amit-ghoda.firebaseio.com",
  projectId: "amit-ghoda",
  storageBucket: "amit-ghoda.appspot.com",
  messagingSenderId: "873816394205"
});

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/ngsw-worker.js') ;
  }
});
