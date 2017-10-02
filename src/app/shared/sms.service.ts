import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class SmsService {

  apiKey = encodeURI('XxoCjrGtqoo-9oKixs6GIo3kNlSymGDRknMUt5H7O0');
  url = 'http://api.textlocal.in/send/?';
  username = encodeURI('mithilgotarne@gmail.com');
  sender = encodeURI('TXTLCL');

  constructor(private http: Http) { }

  send(number: string, message: string) {

    var $data = 'apiKey=' + this.apiKey
      + '&numbers=' + encodeURI('91'+number)
      + "&sender=" + this.sender
      + "&message=" + encodeURIComponent(message);

    return this.http.get(this.url + $data).map(res => res.json());

  }

  private randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  getCode(number: string) {
    return this.randomString(6, number);
  }
}
