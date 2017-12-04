import { Component, OnInit, Input, trigger, state, animate, transition, style, keyframes } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mg-about',
  template: `
  <div class="row center">

    <div class="container paddingTop paddingBottom body-container end-divider" id="aboutRow">

        <div *ngFor="let item of abouts" [@bounceInUp]="'true'"
             (click)="onClick(item.id)"
             class="col-md-4 about">

            <span [ngClass]="item.icon"
                  class="fa fa-lg"></span>
            <h4>{{item.title}}</h4>
            <p>{{item.desc}}</p>

        </div><!-- /.col-md-4 -->

    </div><!-- /.container -->

  </div><!-- /.row -->
  `,
  styleUrls: ['./about.component.scss'],
  animations:[
    
    trigger('bounceInUp', [

        transition('void => *', [

            animate(1000, keyframes([

                style({opacity: 0, transform : 'translateY(400px)', offset: 0}),
                style({transform : 'translateY(-30px)', offset: .60}),
                style({transform : 'translateY(10px)', offset: .80}),
                style({opacity: 1, transform : 'translateY(0)', offset: 1}),

            ]))
        ])
    ])

  ]
})


export class AboutComponent {

 @Input() abouts = [];

 title = {
            eng: 'About',
            mar: 'माझ्याबद्दल'
    }

    constructor(private router:Router) {
    }

    onClick(itemId:string) {
        this.router.navigate(['/about', itemId]);
    }


}
