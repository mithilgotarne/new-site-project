import { Component, OnInit } from '@angular/core';
import { InfoService } from '../shared/info.service';

@Component({
    selector: 'mg-footer',
    template: `
     <footer>        
            <div *ngIf="contact" class="container">
        
                <div class="row">
        
                    <div class="col-md-6">
                    
                        <div class="row">
                            
                             <div class="col-xs-6" [style.marginBottom]="'45px'">
        
                                <h4>Follow Us<span class="head-line"></span></h4>
                                <ul class="social-icons">
                                    <li *ngFor="let s of social">
                                        <a target="_blank" [attr.href]="s.url"><i class="fa" [ngClass]="s.icon"></i></a>
                                    </li>
                                </ul>
        
                                <br><br>
        
                                <a href="#" class="btn btn-primary">{{ compalint_btn_text }}</a>
                
                            </div>  
                            
                    
                            <div class="col-xs-6" [style.marginBottom]="'45px'">
                
                                <h4>
                                    <span style="color: #FD694D">
                                    {{imp_links_text.split(' ')[0]}}
                                    </span> {{imp_links_text.split(' ')[1]}}
                                    <span class="head-line"></span>
                                </h4>
                                <ul>
                                    <li *ngFor="let l of links"
                                    style="font-weight: bold; margin-bottom: 4px">
                                        <i class="fa fa-link"></i><a href="{{ l.url }}"> {{ l[lang] }}</a>
                                    </li>
                                </ul>
                
                            </div> 

                        </div>

                    </div>
                    

                    <!-- Start Contact Widget -->
                    <div class="col-md-6" [style.marginBottom]="'45px'">
                        <div class="footer-widget contact-widget">
                            <h4><span style="color: #FD694D">{{ contact.first_name }}</span> {{ contact.middle_name }} {{ contact.last_name }}<span class="head-line"></span></h4>
                            <p>{{contact.desc}}</p>
                            <ul>
                                <li><span style="font-weight: bold">{{contact.office_address.title }}:</span> {{contact.office_address.value }}</li>
                                <li><span style="font-weight: bold">{{contact.home_address.title }}:</span> {{contact.home_address.value }}</li>
                                <li><span style="font-weight: bold">{{contact.mobile.title }}:</span> {{contact.mobile.value }}</li>
                                <li><span style="font-weight: bold">{{contact.email.title }}:</span> {{contact.email.value }}</li>
                            </ul>
                        </div>
                    </div>
                    <!-- .col-md-3 -->
                    <!-- End Contact Widget -->
        
        
                </div><!--row end-->
        
                <!-- Start Copyright -->
                <div class="copyright-section">
                    <div class="row">
                        <div class="col-sm-6">
                            <p>&copy; 2016.ALL RIGHTS RESERVED.</p>
                        </div>
                        <div class="col-sm-6 text-right">
                            <p>MADE WITH <i class="fa fa-heart"></i> BY MITHIL GOTARNE</p>
                        </div>
                    </div>
                </div>
                <!-- End Copyright -->
        
        
        
            </div><!--end contianer-->
            
        </footer><!-- footer-->
  `,
    providers: [InfoService],
    styleUrls: ['./footer.component.scss'],
    inputs: ['social'],
})
export class FooterComponent implements OnInit {
    social = [];
    contact: any;
    compalint_btn_text: string = "";
    imp_links_text = "";
    lang = "mar";

    links = [{
        eng: 'Contact',
        mar: 'संपर्क',
        url: '/contact'
    },
    {
        eng: 'Register',
        mar: 'सभासद नोंदणी',
        url: '/register'
    },
    {
        eng: 'Complaint Box',
        mar: 'तक्रार पेटी',
        url: '/complaint-box'
    },
    {
        eng: 'Important Links',
        mar: 'महत्वाची संकेतस्थळ',
        url: '/important-links'
    }
    ]

    constructor(private _info: InfoService) { }

    ngOnInit() {
        this._info.getContactInfo().subscribe(
            res => this.contact = res
        );
        this.lang = window.localStorage.getItem('lang') || 'mar';
        this.compalint_btn_text = this.lang == 'mar' ? 'तक्रार दाखल' : 'File Complaint';
        this.imp_links_text = this.lang == 'mar' ? 'द्रुत संकेतस्थळ' : 'Quick Links';
    }


}
