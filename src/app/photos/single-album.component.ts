import { NgModule, Component, OnInit, OnDestroy } from '@angular/core';
import { FacebookService } from '../shared/facebook.service';
import { InfoService } from '../shared/info.service';
import { ActivatedRoute } from '@angular/router';
import { StringToHtmlPipe } from '../shared/string-to-html.pipe';
declare var $: any;

@Component({
  selector: 'mg-single-album',
  template: `
    <div class="modal modal-fullscreen fade" data-backdrop="static" data-keyboard="false"
    id="modal-fullscreen" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div *ngIf="selectedPhoto" class="modal-content text-center">
                <i (click)="closePhoto()" class="fa fa-arrow-left fa-2x pull-left" aria-hidden="true"></i>
                <i (click)="closePhoto()" class="fa fa-times-circle-o fa-2x pull-right" aria-hidden="true"></i>
                <img class="image img-responsive center-block" [src]="selectedPhoto.source">
                <br>
                <p class="lead" [innerHTML] = "selectedPhoto.name | stringToHtml" ></p>
            </div>
        </div>
    </div>

    <div class="container body-container">

        <div *ngIf="!isLoading" class="page-header" style="margin-top: 0">
            <h2 style="margin-top: 0">
                <a [routerLink]="['/gallery']" [innerHTML]="title[lang]"></a><small> / {{album.name}}</small>
            </h2>
        </div>

        <div *ngIf="isLoading" class="text-center" style="min-height: 60vh">

            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>

        </div>

        <div *ngIf="!isLoading" class="row" [style.padding]="'0 0 0 10px'" >

            <img
                [style.height]="'220px'"
                [style.padding]="'0 10px 10px 0'"
                *ngFor="let photo of album.photos.data"
                [src]="getImage(photo)"
                (click)="openPhoto(photo)"
                class="col-xs-6 col-sm-4 col-md-3 animated bounceIn img-responsive center-block">

        </div>

    </div>
  `,
  styleUrls: ['./single-album.component.scss'],
  providers: [FacebookService, InfoService],
})

export class SingleAlbumComponent implements OnInit, OnDestroy {

  sub: any;
  album: any;
  selectedPhoto: any;
  id = '';
  isLoading = true;
  title = {
    mar: '<span class="primary-color">फोटो</span> गॅलरी',
    eng: '<span class="primary-color">Photo</span> Gallery'
  };
  lang = 'mar';

  constructor(private _fb: FacebookService, private _route: ActivatedRoute, private _info: InfoService) { }

  ngOnInit() {

    window.scrollTo(0, 0);

    this.lang = window.localStorage.getItem('lang') || 'mar';

    this.sub = this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this.getAlbum(this.id);
      });

    $('.modal-fullscreen').on('show.bs.modal', function () {
      setTimeout(function () {
        $('.modal-backdrop').addClass('modal-backdrop-fullscreen');
      }, 0);
    });

    $('.modal-fullscreen').on('shown.bs.modal', function () {
      $('.image').css('max-height', $(window).height() - $('.lead').height() - 90 + 'px');
    });


    $('.modal-fullscreen').on('hidden.bs.modal', function () {
      $('.modal-backdrop').addClass('modal-backdrop-fullscreen');
    });



    window.onpopstate = this.windowOnPopstate;
  }

  windowOnPopstate(event) {
    this.selectedPhoto = null;
    $('.modal').modal('hide');
  }

  ngOnDestroy() {
    $('.modal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    this.sub.unsubscribe();
  }

  getAlbum(id: string) {

    if (!isNaN(+id)) {
      this._fb.getSingleAlbum(id).subscribe(
        album => {
          this.album = album;
          // console.log(this.album);
        },
        (error) => {
          location.href = '/gallery';
        },
        () => {
          this.isLoading = false;
          $(window).scroll();
        });
    }
    else {
      this._info.getAlbumList().subscribe(
        albums => {
          for (let album of albums) {
            if (album.id === id) {
              this.album = album;
            }
          }
          // console.log(this.album);
        },
        null,
        () => {
          this.isLoading = false;
          $(window).scroll();
        });
    }
  }

  openPhoto(photo) {
    this.selectedPhoto = {
      name: photo.name,
      source: photo.images ? photo.images[0].source : photo.src
    };
    $('.modal').modal('show');
    history.pushState({ obj1: 'obj1' }, 'Amit Ghoda', location.pathname + '/#');
  }

  closePhoto() {
    history.back();
  }

  getImage(data: any) {
    if (data.images != null) {
      let i = 0;
      let source = data.images[0].source;
      let height = data.images[0].height;
      for (let image of data.images) {
        if (image.height >= 280) {
          height = height < image.height ? height : image.height;
          source = height < image.height ? source : image.source;
        }
        i++;
      }
      return source;
    }
    return data.src;
  }
}
