import { Component, OnInit, transition, state, style, trigger, animate, keyframes } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { InfoService } from '../shared/info.service';
import { FacebookService } from '../shared/facebook.service';
declare var $: any;

@Component({
    selector: 'mg-photos',
    template: `
    <div class="container">
        
        <div class="page-header" style="margin-top: 0">
            <h1 style="margin-top: 0" [innerHTML]="title[lang]"></h1>
        </div>
        
        <div *ngIf="isLoading" class="text-center" style="min-height: 60vh">
        
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span> 
        
        </div>
        
        <div class="row">
            
            <div *ngFor="let album of albums" class="album-folder col-sm-6"
            [@flipInY]="'true'"
             (click)="openAlbum(album)">
            
                <div class="well">
                    
                    <img class="img-responsive center-block" [src]="getCover(album)">
                    <h3 class="text-center"><strong>{{album.name}}</strong></h3>
                    
                </div>
              
            </div>
                            
        </div>
        
    </div>
  `,
    styles: [`

    img{
        height: 280px;
    }

    .album-folder:hover{
        cursor: pointer;
    }

  
  `],
    providers: [FacebookService, InfoService],

    animations: [

        trigger('flipInY', [
            transition('void => *', [

                animate(1000, keyframes([

                    style({transform: 'perspective(400px) rotateY(90deg)', opacity: 0, offset: 0}),
                    style({transform: 'perspective(400px) rotateY(-10deg)', offset: 0.4}),
                    style({transform: 'perspective(400px) rotateY(10deg)', offset: 0.7}),
                    style({transform: 'perspective(400px) rotateY(0deg)', opacity: 1, offset: 1})

                ]))

            ])
        ])

    ],
})

export class PhotosComponent implements OnInit {

    albums = [];
    isLoading = true;
    title = {
        mar: '<span class="primary-color">फोटो</span> गॅलरी',
        eng: '<span class="primary-color">Photo</span> Gallery'
    };
    lang = 'mar';

    constructor(private _fb: FacebookService, private _router: Router, private _info: InfoService) { }

    ngOnInit() {
        this.lang = window.localStorage.getItem('lang') || 'mar';
        Observable.forkJoin(
            this._info.getAlbumList(),
            this._fb.getAlbums()
        ).subscribe(
            albums => {
                this.albums = albums[0];
                for (let album of albums[1])
                    this.albums.push(album);
                console.log(this.albums);
            },
            null,
            () => {
                this.isLoading = false;
                $(window).scroll();
            }
            );
    }

    getCover(album: any) {
        if (album.photos.data[0].images != null) {
            let i = 0;
            let source = album.photos.data[0].images[0].source;
            let height = album.photos.data[0].images[0].height;
            for (let image of album.photos.data[0].images) {
                if (image.height >= 280) {
                    height = height < image.height ? height : image.height;
                    source = height < image.height ? source : image.source;
                }
                i++;
            }
            return source;
        }
        return album.photos.data[0].src;
    }

    openAlbum(album: any) {
        this._router.navigate(['/gallery', album.id]);
    }

}
