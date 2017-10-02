import { Component, OnInit } from '@angular/core';
import { SmsService } from '../shared/sms.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-complaint-box',
  templateUrl: './complaint-box.component.html',
  styleUrls: ['./complaint-box.component.scss'],
})
export class ComplaintBoxComponent implements OnInit {
  postSuccess: boolean;
  postError: any;
  codeError: boolean;

  complaint = {
    subject: '',
    description: '',
    contactNo: '',
    email: ''
  }

  title = {
    eng: 'Complaint Form',
    mar: 'तक्रार फॉर्म'
  }

  code: any;

  constructor(private sms: SmsService) { }

  ngOnInit() {
    this.newComplaint();
  }

  newComplaint() {
    this.complaint = {
      subject: '',
      description: '',
      contactNo: '',
      email: ''
    }
  }

  onSubmit() {
    this.postSuccess = false;
    this.postError = false;
    this.code = this.sms.getCode(this.complaint.contactNo);
    this.sms.send(this.complaint.contactNo, 'Your OTP for posting complaint on amitghoda.com: ' + this.code)
      .subscribe(res => {
        if (res.status == "success") {
          this.codeError = false;
          console.log(res);
          $('.modal').modal('show');
        } else {
          this.postError = res;
          console.log(res);
        }
      });

  }

  verify(code: string) {
    this.codeError = false;
    if (this.code == code) {
      $('.modal').modal('hide');
      firebase.database().ref('/complaints/').push(this.complaint);
      this.postSuccess = true;
    } else {
      this.codeError = true;
    }
  }

}
