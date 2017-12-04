import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacebookService } from '../shared/facebook.service';
declare var $: any;

@Component({
    selector: 'mg-social-initiatives-single',
    template: `
      <div class="container body-container">
                    
            <div class="page-header" style="margin-top: 0">
                <h2 style="margin-top: 0">
                    <a [routerLink]="['/social-initiatives']" [innerHTML]="title[lang]"></a>
                    <small> / {{ project.created_time | date:'d MMM, y' }} at {{project.created_time | date:'hh:mm a'}}</small>
                </h2>
            </div>
            
            <div *ngIf="isLoading" class="text-center" style="min-height: 60vh">
            
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span> 
            
            </div>

            <p class="lead text-center" [innerHTML]="project.message"></p>

            <img *ngFor="let i of project.img" [src]="i" class="img-responsive center-block">
            
        </div>
  `,
    styles: [
        `
        a, a:link{
            text-decoration: none;
        }

        img{
            margin-bottom: 30px;
        }

        @media( max-width:424px){

            h2{
                font-size: 1.5em;
            }

        }
        .container{
            margin-top: -20px;
            padding-top: 20px;
        }
      `
    ],
    providers: [FacebookService]

})
export class SocialInitiativesSingleComponent implements OnInit {

    project: any;
    isLoading = true;
    title = {
        mar: '<span class="primary-color">सामाजिक</span> उपक्रम',
        eng: '<span class="primary-color">Social</span> Initiatives'
    };
    lang = 'mar';

    constructor(private _fb: FacebookService, private _route: ActivatedRoute) { }

    ngOnInit() {
        window.scrollTo(0, 0);
        let projectId = this._route.snapshot.params['id'];
        this.project = {};
        this._fb.getSinglePost(projectId).subscribe(
            project => {
                let img = [];
                // console.log(project);
                for (let a of project['attachments']['data'][0]['subattachments']['data']) {
                    img.push(a['media']['image']['src']);
                }
                project['attachments'] = null;
                project['img'] = img;
                this.project = project;
            },
            null,
            () => {
                this.isLoading = false;
                $(window).scroll();
                this.lang = window.localStorage.getItem('lang') || 'mar';
            }
        );

    }

}
