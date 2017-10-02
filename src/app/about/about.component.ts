import { Component, OnInit, trigger, style, state, transition, animate, keyframes } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InfoService } from '../shared/info.service';
declare var $: any;

@Component({
    selector: 'mg-about',
    template: `
     <div class="container-fluid">

        <div class="row">

            <!-- Nav tabs -->
                <ul class="nav nav-stacked col-md-2" role="tablist">

                    <li
                        *ngFor="let b of abouts"
                        [class.active]="b.id == activeId"
                        role="presentation"
                        (click)="onClick(b.id)">

                        <a [attr.href]="'#'+ b.id" [attr.aria-controls]="n"
                           role="tab" data-toggle="tab">

                            <i class="fa" [ngClass]="b.icon"></i>

                            <span class="about-title">{{b.title}}</span>

                        </a>
                    </li>
                </ul>

            <!-- Tab panes -->
            <div class="tab-content col-md-10">


                <div *ngFor="let a of abouts"
                        [ngClass]="{active : a.id == activeId, in : a.id == activeId}"
                        role="tabpanel" [@fadeIn]="a.id == activeId ? 'active' : 'inactive'"
                        class="tab-pane"
                        [innerHTML]="a.desc"
                        [attr.id]="a.id">
                    
                </div>

            </div>
        </div>

    </div>
  `,
    styleUrls: ['./about.component.scss'],
    animations: [
        trigger('fadeIn', [

            transition('* => active', [

                animate(1000, keyframes([

                    style({ opacity: 0, offset: 0 }),
                    style({ opacity: 0.5, offset: .5 }),
                    style({ opacity: 1, offset: 1 })

                ]))
            ])
        ])
    ]
})
export class AboutComponent implements OnInit {

    abouts = [];
    activeId = '';

    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _info: InfoService) { }

    ngOnInit() {
        window.scrollTo(0, 0);
        this._info.getAbouts().subscribe(
            abouts => this.abouts = abouts,
            null,
            () => {
                this._route.params.subscribe(params => this.activeId = params['id'] || 'know-me');
                $(window).scroll();
            }
        );
    }

    onClick(id: string) {
        this._router.navigate(['/about', id]);
    }

}
