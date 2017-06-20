import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../shared/base-http.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    login(username: string, password: string) {
        return this.http.post(this.hostAPI + '/authenticate'
            , JSON.stringify({ name: username, password: password })
            , this.options())
            .map((response: Response) => {
                // login successful if there's a token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}