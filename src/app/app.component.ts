import { Component, OnInit } from '@angular/core';
import { InfoService } from './shared/info.service';
import { HomeComponent } from './home/home.component';
import { Router } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

declare var $: any;

@Component({
  selector: 'mg-root',
  templateUrl: './app.component.html',
  providers: [InfoService],
  styleUrls:['./app.component.scss']
})

export class AppComponent implements OnInit {

  firstname = {mar : 'अमित', eng: 'Amit'};
  lastname = {mar: 'घोडा', eng: 'Ghoda'};
  social = [];

  constructor(private _info: InfoService, private _router: Router) { }

  ngOnInit() {
    this._info.getSocialAccounts().subscribe(social => this.social = social);
  }

}
