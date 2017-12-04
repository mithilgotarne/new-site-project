import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookService } from '../shared/facebook.service';
import { Observable } from 'rxjs/Rx';

declare var $: any;

@Component({
    selector: 'mg-major-projects',
    template: `
      <div class="container body-container">
                    
            <div class="page-header" style="margin-top: 0">
                <h2 style="margin-top: 0" [innerHTML]="title[lang]"></h2>
            </div>
            
            <div *ngIf="isLoading" class="text-center" style="min-height: 60vh">
            
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span> 
            
            </div>
        
            <div *ngFor="let p of projects let i = index" class="row well" 
                (@flyIn.done)="openProject($event, p.id)"
                [@flyIn]="p.dir"
                (click)="p.dir='selected';">

                <div class="row">
                
                  <div class="col-sm-6 col-md-4">
                      <img [src]="p['src']" class="img-rounded img-responsive center-block">
                  </div>
                  
                  <div class="col-sm-6 col-md-8">
                      <h3>{{ p.created_time | date:'d MMMM, y' }} at {{p.created_time | date:'hh:mm a'}}</h3>
                      <p *ngIf="p.message">{{ p.message.length > 500 ? (p.message | slice:0:497)+'...' : p.message }}</p>
                      <a class="btn btn-primary">{{readMore[lang]}}</a>
                  </div>

                </div>
                
            </div>

            <nav aria-label="..." *ngIf="!isLoading">
              <ul class="pager">
                <li *ngIf="!leftOn">
                    <a [routerLink]="['/social-initiatives', {url : paging['previous']  }]">
                        <span aria-hidden="true">&larr;</span> {{ newer[lang] }}
                    </a>
                </li>
                <li *ngIf="!rightOn">
                    <a [routerLink]="['/social-initiatives', {url : paging['next'] }]">
                        {{ older[lang] }} <span aria-hidden="true">&rarr;</span></a>
                </li>
              </ul>
            </nav>          
        
    </div>
  `,
    styleUrls: ['./major-projects.component.scss'],
    animations: [

        trigger('flyIn', [
            transition('void => left', [
                animate(1000, keyframes([
                    style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ]),
            transition('void => right', [
                animate(1000, keyframes([
                    style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ]),
            transition('* => selected', [
                animate(600, keyframes([
                    style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                    style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                ]))
            ])
        ])
    ],
    providers: [FacebookService]
})
export class MajorProjectsComponent implements OnInit {

    projects = [];
    isLoading = true;
    leftOn = false;
    rightOn = false;
    title = {
        mar: '<span class="primary-color">सामाजिक</span> उपक्रम',
        eng: '<span class="primary-color">Social</span> Initiatives'
    };
    readMore = {
        mar: 'पुढे वाचा',
        eng: 'Read More'
    };
    newer = {
        mar: 'नवीन सामाजिक उपक्रम',
        eng: 'Newer'
    };
    older = {
        mar: 'जुन्या सामाजिक उपक्रम',
        eng: 'Older'
    }
    lang = 'mar';
    paging = {};

    constructor(private _fb: FacebookService,
        private _router: Router,
        private _route: ActivatedRoute) { }

    openProject($event, id) {
        if ( ($event.fromState == "left" || $event.fromState == "right") && $event.toState == "selected") {
            this._router.navigate(['/social-initiatives', id]);
        }
    }

    ngOnInit() {
        this.lang = window.localStorage.getItem('lang') || 'mar';
        this.isLoading = true;
        this._route.params.subscribe(params => {
            if (!params['url']) {
                this.getProjects();
            }
            else {
                this.getProjectsByUrl(params['url']);
            }
        });
    }

    processPaging(){
        Observable.forkJoin(
            this._fb.getData(this.paging['previous']),
            this._fb.getData(this.paging['next']))
            .subscribe(
                response => {
                    if(!response[0]['paging'])
                        this.leftOn = true;
                    else
                        this.leftOn = false;
                    if(!response[1]['paging'])
                        this.rightOn = true;
                    else
                        this.rightOn = false;

                }
            );
    }

    getProjectsByUrl(url) {

        this._fb.getData(url).subscribe(
            projects => { this.projects = projects.data; this.paging = projects.paging },
            null,
            () => this.processProjects()
        );

    }

    getProjects() {

        this._fb.getPosts().subscribe(
            projects => { this.projects = projects.data; this.paging = projects.paging },
            null,
            () => this.processProjects()
        );

    }

    processProjects() {
        var proj = [];
        let n = 0;

        for (let p of this.projects) {
            if (p['attachments']) {
                let src = p['attachments']['data'][0]['subattachments']['data'][0]['media']['image']['src'];
                for (var i of p['attachments']['data'][0]['subattachments']['data']) {
                    if (i['media']['image']['height'] < i['media']['image']['width']) {
                        src = i['media']['image']['src'];
                        break;
                    }
                }
                p['attachments'] = null
                p['src'] = src;
                p['dir'] = n % 2 == 0 ? 'left' : 'right';
                proj.push(p);
                n++;
            }
        }

        this.projects = proj;
        window.scrollTo(0, 0);
        this.isLoading = false;
        this.processPaging();
    }

}
