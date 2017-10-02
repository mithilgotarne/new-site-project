import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

declare var $: any;

@Component({
  selector: 'mg-main',
  template: `
    <router-outlet></router-outlet>
  `,
})

export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
