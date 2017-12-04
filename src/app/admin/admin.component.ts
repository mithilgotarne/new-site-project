import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  template: `
   <div class="container">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Admin</a>
        </div>
          <ul class="nav navbar-nav navbar-right">
            <li [ngClass]="{ 'active' : rlac.isActive && !rlau.isActive }" >
              <a [routerLink]="['/admin']" 
                routerLinkActive="active" 
                #rlac="routerLinkActive">Complaints</a>
            </li>
            <li [ngClass]="{ 'active' : rlau.isActive }">
              <a [routerLink]="['users']" routerLinkActive="active" 
              #rlau="routerLinkActive">Users</a>
            </li>
            <li><a href="/" target="_blank">Visit Site</a></li>
            <li><button style="margin-right: 10px"
            type="button" class="btn btn-danger navbar-btn" (click)="logout()">Logout</button></li>
          </ul>
      </div><!-- /.container-fluid -->
    </nav>
    <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
    .container{
      margin-top: -30px;
    }
    `
  ]
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private _auth: AngularFireAuth) { }

  ngOnInit() {
  }

  logout(){
    this._auth.auth.signOut();
    this.router.navigate(['login']);

  }


}
