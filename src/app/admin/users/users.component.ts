import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = []
  constructor() {
    firebase.database().ref('/users').on('child_added', snap => {
      this.users.push(snap.val())
    });
  }

  ngOnInit() {
  }

}
