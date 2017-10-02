import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'mg-nav',
    template: `
      <nav class="navbar navbar-default navbar-fixed-top" id="main-menu">

            <div class="container">
            
                <div class="navbar-header">

            <a class="navbar-brand" [routerLink]="['/']"><span style="color: #FD694D">{{firstName[lang]}}</span> {{lastName[lang]}}</a>

            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

        </div><!-- /.navbar-header -->

                <div id="navbar" class="collapse navbar-collapse">

                    <ul class="nav navbar-nav navbar-right" id="right-menu">

                        <li [class.active]="isActive('')">
                            <a [routerLink]="['/']">{{nav.home[lang]}}</a>
                        </li>

                        <li [class.active]="isActive('about')">
                            <a [routerLink]="['/about', 'know-me']">{{nav.about[lang]}}</a>
                        </li>

                        <li [class.active]="isActive('social-initiatives')">
                            <a [routerLink]="['/social-initiatives']">{{nav.socialInitiatives[lang]}}</a>
                        </li>
                        
                        <li [class.active]="isActive('gallery')">
                            <a [routerLink]="['/gallery']">{{nav.gallery[lang]}}</a>
                        </li>
                        
                        <li class="dropdown">
                          <a href="#" class="dropdown-toggle" 
                          data-toggle="dropdown" role="button" 
                          aria-haspopup="true" aria-expanded="false">
                              {{nav.other[lang]}} <span class="caret"></span>
                          </a>
                          <ul class="dropdown-menu">

                            <li [class.active]="isActive('contact')">
                                <a [routerLink]="['/contact']">{{nav.contact[lang]}}</a>
                            </li>

                            <li [class.active]="isActive('register')">
                                <a [routerLink]="['/register']" >{{nav.register[lang]}}</a>
                            </li> 

                            <li [class.active]="isActive('complaint-box')">
                                <a [routerLink]="['/complaint-box']" >{{nav.complaint_box[lang]}}</a>
                            </li> 

                            <li [class.active]="isActive('important-links')">
                                <a [routerLink]="['/important-links']" >{{nav.important_links[lang]}}</a>
                            </li> 

                          </ul>
                        </li>

                        <li>
                            <select class="form-control" #language (change)="changeLang(language.value)">
                                <option value="mar">मराठी</option>
                                <option value="eng">English</option>
                            </select>
                        </li>

                    </ul>

                </div><!-- /#navbar.collapse navbar-collapse -->

            </div><!-- /.container -->

        </nav><!-- /.navbar navbar-default -->
  `,
    styles: [`
        .navbar-default .navbar-nav>.open>a, 
        .navbar-default .navbar-nav>.open>a:focus, 
        .navbar-default .navbar-nav>.open>a:hover{
            color: #FD694D;
            background-color: transparent;
        }
        .form-control{
            width: auto;
            margin-top: 8px;
            margin-left: 4px;
        }
        .dropdown-menu > li > a{
            line-height: 20px;
        }
        .dropdown-menu > li{
            padding-top: 5px;
            padding-bottom: 5px;
        }
      `],
    inputs: ['firstName', 'lastName'],
})
export class NavComponent implements OnInit {

    firstName: any;
    lastName: any;
    lang = 'mar';

    nav = {
        home: {
            eng: 'Home',
            mar: 'मुख्यपृष्ठ'
        },
        about: {
            eng: 'About',
            mar: 'माझ्याबद्दल'
        },
        socialInitiatives: {
            eng: 'Social Initiatives',
            mar: 'सामाजिक उपक्रम'
        },
        gallery: {
            eng: 'Gallery',
            mar: 'गॅलरी'
        },
        other: {
            eng: 'Others',
            mar: 'इतर'
        },
        contact: {
            eng: 'Contact',
            mar: 'संपर्क'
        },
        register: {
            eng: 'Register',
            mar: 'सभासद नोंदणी'
        },
        complaint_box: {
            eng: 'Complaint Box',
            mar: 'तक्रार पेटी'
        },
        important_links: {
            eng: 'Important Links',
            mar: 'महत्वाची संकेतस्थळ'
        }
    };

    constructor(private _router: Router) { }

    ngOnInit() {
        this.lang = window.localStorage.getItem('lang') || 'mar';
        $('select').val(this.lang);
        this.setup();
    }

    isActive(path: string) {
        if (this._router.url != '/' && path == '')
            return false;
        return this._router.url.match('/' + path) != null;
    }

    changeLang(newLang: string) {
        if (newLang != this.lang) {
            this.lang = newLang;
            window.localStorage.setItem('lang', this.lang);
            window.location.reload();
        }
    }

    setup() {
        $(document).click(function (e) {
            if ($(e.target).is('select') || $(e.target).is('li.dropdown>a')) {
                return;
            }
            $('.navbar-collapse').collapse('hide');
        });
    }

}
