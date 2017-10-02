import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  error: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signIn(email: string, pass: string) {
    firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
      this.router.navigateByUrl('/admin');
    }).catch(error => {
      this.error = error.message;
    })
  }

}
