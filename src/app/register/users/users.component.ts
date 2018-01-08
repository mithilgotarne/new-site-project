import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title =  {
    mar : 'नोंदणीकृत सदस्य',
    eng: 'Registered Users'
  }

  users: Observable<any[]>
  constructor(private _db: AngularFireDatabase) {
    this.users = _db.list('/users').valueChanges();
  }

  ngOnInit() {
  }

}
