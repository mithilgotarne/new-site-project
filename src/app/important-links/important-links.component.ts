import { Component, OnInit } from '@angular/core';
import { InfoService }from '../shared/info.service';

@Component({
  selector: 'app-important-links',
  templateUrl: './important-links.component.html',
  styleUrls: ['./important-links.component.scss']
})
export class ImportantLinksComponent implements OnInit {

  links = [];
  title = {
     eng: 'Important Links',
    mar: 'महत्वाची संकेतस्थळं'
  };

  constructor(private is: InfoService) { }

  ngOnInit() {
    
   this.is.getImpLinks().subscribe(res => this.links = res);

  }

}
