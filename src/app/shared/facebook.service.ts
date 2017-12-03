/**
 * Created by Mithil on 6/13/2016.
 */
import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()

export class FacebookService {

    private static BASE_URL = 'https://graph.facebook.com/v2.6/';
    private static PAGE = 'AmitGhoda.ShivSenaPalgharVidhanSabha';
    private static PAGE_ID = '213483665658521';
    private static FIELDS = '?fields=';
    private static ACCESS_TOKEN = '&access_token=103319759774275|CGX_CGfWzxdYmFO3U9_lE6_JriQ';

    constructor(private _http: Http) {
    }

    getPosts() {
        return this.getPostsWithLimit(15);
    }

    getPostsWithLimit(limit: number){

        return this._http
            .get(FacebookService.BASE_URL + '/' + FacebookService.PAGE_ID + '/posts'
            + FacebookService.FIELDS + 'attachments{subattachments},created_time,message&limit='+limit
            + FacebookService.ACCESS_TOKEN)
            .map(res => res.json());

    }

    getData(url) {
        return this._http.get(url).map(res => res.json());
    }

    getSinglePost(id: String) {
        return this._http
            .get(FacebookService.BASE_URL + id
            + FacebookService.FIELDS + 'name,message,story,created_time,attachments{subattachments}'
            + FacebookService.ACCESS_TOKEN)
            .map(res => res.json());
    }

    getAlbums() {

        return this._http
            .get(FacebookService.BASE_URL + FacebookService.PAGE + '/albums'
            + FacebookService.FIELDS + 'name,photos{images}&limit=6'
            + FacebookService.ACCESS_TOKEN)
            .map(res => res.json().data);
    }

    getSingleAlbum(id: String) {

        return this._http
            .get(FacebookService.BASE_URL + id
            + FacebookService.FIELDS + 'name,photos{name,created_time,images}'
            + FacebookService.ACCESS_TOKEN)
            .map(res => res.json());

    }

}