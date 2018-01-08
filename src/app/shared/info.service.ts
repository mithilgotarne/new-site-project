import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Injectable()

export class InfoService {

  constructor(private _http: Http) {}

  getSlides(){
    return this._http.get('assets/data/slides.json').map(
      res => res.json());
  }

  getContactInfo(){
    let lang = window.localStorage.getItem('lang') || 'mar';
    return this._http.get('assets/data/contact.json').map(
      res => res.json()[lang]);
  }

  getAbouts(){
    let lang = window.localStorage.getItem('lang');
    if(lang == 'eng'){
      return this._http.get('assets/data/about.json').map(
      res => res.json());
    }
    else
      return this._http.get('assets/data/about-marathi.json').map(
        res => res.json());
  }

  getProjects(){
    return this._http.get('assets/data/major-projects.json').map(
      res => res.json());
  }

  getAlbumList(){
    return this._http.get('assets/data/gallery.json').map(
      res => res.json());
  }

  getImpLinks(){
    let lang = window.localStorage.getItem('lang');
    if(lang == 'eng'){
      return this._http.get('assets/data/imp-links.json').map(
      res => res.json());
    }
    else
      return this._http.get('assets/data/imp-links-marathi.json').map(
        res => res.json());
  }

}