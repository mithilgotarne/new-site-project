import { Component, OnInit } from '@angular/core';
import { InfoService } from '../shared/info.service';

declare var $: any;

@Component({
  selector: 'mg-contact',
  template: `

      <div class="parallax"></div>

      <div class="container">

        <div class="row">

          <div class="col-md-8">

            <div class="embed-responsive embed-responsive-4by3">
              <iframe class="embed-responsive-item"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60102.8915539932!2d72.73399743233267!3d19.69427816612327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71cdea3ddc177%3A0xdb2b913629961d24!2sPalghar%2C+Maharashtra+401404!5e0!3m2!1sen!2sin!4v1467911367244"
              ></iframe>
            </div>

          </div>

          <div *ngIf="contact" class="col-md-4">

            <!-- Classic Heading -->
            <h4 class="classic-title"><span>{{ contact.info_title }}</span></h4>

            <!-- Some Info -->
            <h5>{{contact.first_name + ' ' + contact.middle_name + ' ' + contact.last_name}}</h5>
            <h6>{{contact.desc}}</h6>

            <!-- Divider -->
            <div class="hr1" style="margin-bottom:10px;"></div>

            <!-- Info - Icons List -->
            <ul class="icons-list text-justify">
              <li><i class="fa fa-globe">  </i> <strong>{{ contact.office_address['title'] }}:</strong> {{ contact.office_address['value'] }}</li>
              <li><i class="fa fa-globe">  </i> <strong>{{ contact.home_address['title'] }}:</strong> {{ contact.home_address['value'] }}</li>
              <li><i class="fa fa-envelope-o"> </i> <strong>{{ contact.email.title }}:</strong> {{ contact.email.value }}</li>
              <li><i class="fa fa-mobile"> </i> <strong>{{ contact.mobile.title }}:</strong>  {{ contact.mobile.value }}</li>
            </ul>

            <!-- Divider -->
            <div class="hr1" style="margin-bottom:15px;"></div>

            <!-- Classic Heading -->
            <h4 class="classic-title"><span>{{ contact.working_hours.title }}</span></h4>

            <!-- Info - List -->
            <ul class="list-unstyled" [innerHTML]="contact.working_hours.value"></ul>

          </div>

        </div>

      </div>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: any;

  constructor(private _info: InfoService) { }

  ngOnInit() {
    this._info.getContactInfo().subscribe(
      res => {
        this.contact = res; // console.log(this.contact);
      }
    );
  }

}
