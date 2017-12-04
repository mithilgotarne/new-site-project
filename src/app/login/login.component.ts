import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  error: any;
  loading = false;
  constructor(private router: Router, private auth: AngularFireAuth) { }

  ngOnInit() {
  }

  signIn(email: string, pass: string) {
    this.loading = true;
    this.auth.auth.signInWithEmailAndPassword(email, pass).then(() => {
      this.router.navigateByUrl('/admin');
      this.loading = false;
    }).catch(error => {
      this.error = error.message;
      this.loading = false;
    })
  }

}
