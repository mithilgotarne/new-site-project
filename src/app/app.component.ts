import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

declare var $: any;

@Component({
  selector: 'mg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  firstname = { mar: 'अमित कृष्णाजी घोडा', eng: 'Amit Krushnaji Ghoda' };
  lastname = { mar: '', eng: '' };
  social = [
    {
      "url": "https://www.facebook.com/213483665658521/",
      "icon": "fa-facebook-f"
    },
    {
      "url": "#",
      "icon": "fa-twitter"
    },
    {
      "url": "#",
      "icon": "fa-google"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
