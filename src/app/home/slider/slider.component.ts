import { Component, EventEmitter, Input } from '@angular/core';

declare var $: any;

@Component({
    selector: 'mg-slider',
    template: `
  <div class="row">

    <div id="carousel-example-generic" class="carousel" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic"
                *ngFor="let s of slides let n=index"
                [attr.data-slide-to]="n" [class.active]="isActive(s)"></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">

            <div class="item" *ngFor="let slide of slides"
                 [class.active]="isActive(slide)">
                <img class="img-responsive center-block" [src]="slide.imgUrl">
                <div class="carousel-caption">{{slide.caption}}</div>
            </div>

        </div>

        <!-- Controls -->
        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>

  </div><!-- /.row -->
  `,
    styleUrls: ['./slider.component.scss'],
})

export class SliderComponent {

    @Input() slides: any = [];

    ngOnInit() {
    
            $('#carousel-example-generic').carousel({
                interval: 2000
            });
    }

    isActive(slide) {
        return slide === this.slides[0];
    }
}
