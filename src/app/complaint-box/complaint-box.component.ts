import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-complaint-box',
  templateUrl: './complaint-box.component.html',
  styleUrls: ['./complaint-box.component.scss'],
})

export class ComplaintBoxComponent implements OnInit {
  postSuccess: boolean;
  postError: any;
  codeError: boolean;
  loading = false;

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

  recaptchaVerifier = null;
  confirmationResult = null;

  constructor(private _auth: AngularFireAuth, private _db: AngularFireDatabase) {

    $('.modal').modal({
      backdrop: 'static',
      show: false
    });

    _auth.auth.languageCode = localStorage.getItem('lang') && localStorage.getItem('lang') === 'eng' ? 'en' : 'mr';
  }

  ngOnInit() {
    this.newComplaint();
    this.newCap();
  }

  newCap() {

    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': response => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // console.log(response);
        $('#sign-in-button').click(e => this.onSubmit()).click();

      }
    });
    this.recaptchaVerifier.render();
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
    this.loading = true;
    this._auth.auth.signInWithPhoneNumber('+91' + this.complaint.contactNo, this.recaptchaVerifier)
      .then(confirmationResult => {
        this.codeError = false;
        // console.log(confirmationResult);
        this.confirmationResult = confirmationResult
        this.loading = false;
        $('.modal').modal('show');
      }).catch((error) => {
        this.postError = error;
        this.loading = false;
        // console.log(error);
      });
  }

  verify(code: string, form) {
    this.codeError = false;
    this.loading = true;
    this.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      // var user = result.user;
      $('.modal').modal('hide');
      this.complaint['user_metadata'] = JSON.parse(localStorage.getItem('user_info'));
      this.complaint['timestamp'] = firebase.database.ServerValue.TIMESTAMP;
      this._db.database.ref('/complaints/').push(this.complaint);
      this.loading = false;
      this.postSuccess = true;
      this.newComplaint();
      form.reset();
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // console.log(error);
      this.codeError = true;
      this.loading = false;
      // ...
    });
  }

}
