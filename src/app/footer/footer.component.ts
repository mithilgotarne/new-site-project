import { Component, OnInit } from '@angular/core';
import { InfoService } from '../shared/info.service';

@Component({
    selector: 'mg-footer',
    templateUrl: './footer.component.html',
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
        mar: 'महत्वाची संकेतस्थळं',
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
