import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  complaints:Observable<any[]>
  constructor(private _db: AngularFireDatabase) {
    this.complaints = _db.list('/complaints').valueChanges();
  }

  ngOnInit() {
  }

}
