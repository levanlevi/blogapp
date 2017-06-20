import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BaseService {
    protected host: string = 'http://localhost:8000';
    protected hostAPI: string = this.host + '/api';

    constructor(protected http: Http) { }

    protected get(url, options) {
        return this.http.get(url, options);
    }

    protected post(url, postData, options) {
        return this.http.post(url, postData, options);
    }

    protected options(): RequestOptions {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return new RequestOptions({ headers: headers });
    }

    protected authorisedOptions(): RequestOptions {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({
                'x-access-token': currentUser.token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*'
            });
            return new RequestOptions({ headers: headers });
        }
    }
}