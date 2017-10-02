import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  complaints = []
  constructor() {
    firebase.database().ref('/complaints').on('child_added', snap => {
      this.complaints.push(snap.val())
    });
  }

  ngOnInit() {
  }

}
