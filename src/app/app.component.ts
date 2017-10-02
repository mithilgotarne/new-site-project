import { Component, OnInit } from '@angular/core';
import { InfoService } from './shared/info.service';
import { HomeComponent } from './home/home.component';
import { Router } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

declare var $: any;

@Component({
  selector: 'mg-root',
  template: `
    <mg-nav [firstName]="firstname" [lastName]="lastname"></mg-nav>

    <nav class="navbar navbar-fixed-top" id="left-floating-icons">
        <ul class="nav nav-stacked animatedParent" data-sequence="500">
          <li class="animated fadeInRight" *ngFor="let s of social let i = index" data-id="i" >
              <a target="_blank" [attr.href]="s.url"><i class="fa fa-2x" [ngClass]="s.icon"></i></a>
          </li>
        </ul>
    </nav>

    <main>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </main>

    <mg-footer [social]="social"></mg-footer>
  `,
  providers: [InfoService],
  styles: [`
      main {
      display: -webkit-box;
      display: -moz-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: box;
      display: flex;
      -webkit-box-orient: vertical;
      -moz-box-orient: vertical;
      -o-box-orient: vertical;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      min-height: 55vh;
    }
    .content {
      -webkit-box-flex: 1;
      -moz-box-flex: 1;
      -o-box-flex: 1;
      box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }
  `]
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
