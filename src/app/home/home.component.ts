import { Component, OnInit, trigger, state, animate, transition, style, keyframes } from '@angular/core';
import { InfoService } from '../shared/info.service';
import { Observable } from 'rxjs/Rx';
import { SliderComponent } from './slider/slider.component';
import { AboutComponent } from './about/about.component';

declare var $:any;

@Component({
  selector: 'mg-home',
  template: `
    <div class="container-fluid">
        <div [@fadeIn]="state">
          <mg-slider [slides]="slides"></mg-slider>
        </div>
        <mg-about [abouts]="abouts"></mg-about>
    </div>
  `,
  styleUrls : ['./home.component.scss'],
  providers: [InfoService],
  animations:[

    trigger('fadeIn', [

      transition('void => *', [

          animate(1000, keyframes([

              style({opacity : 0, offset: 0}),
              style({opacity : 0.5, offset: .5}),
              style({opacity : 1, offset: 1})

          ]))
        ])
    ])

  ]
})
export class HomeComponent implements OnInit {

  abouts = [];
  slides = [];
  state : string = "state";

  constructor(private _info: InfoService) {}

  ngOnInit() {
    window.scrollTo(0,0);

      Observable.forkJoin(
        this._info.getSlides(),
        this._info.getAbouts()
        ).subscribe(
          response => {
            this.slides = response[0];
            this.abouts = response[1];
          },
          null,
          () => {
            $(window).scroll();
            this.abouts.splice(3);
          }
      );

  }

}
