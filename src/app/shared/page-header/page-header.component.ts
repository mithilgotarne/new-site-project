import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mg-page-header',
  template: `
    <div class="page-header" style="margin-top: 0;">
      <h1 style="margin-top: 0">
        <span class="primary-color">{{ partOne }}</span> {{ partTwo }}
      </h1>
    </div>
  `,
  styles: []
})
export class PageHeaderComponent implements OnInit {

  @Input() title; 

  partOne = '';
  partTwo = '';

  constructor() { }

  ngOnInit() {

    let lang = localStorage.getItem("lang") || 'mar';

    let title = this.title[lang];
  
    let index = title.trim().indexOf(' ');
    if(index != -1){
      
      this.partOne = title.substring(0, index);
      this.partTwo = title.substring(index + 1);

    }else{
      this.partOne = title;
    }

  }

}
