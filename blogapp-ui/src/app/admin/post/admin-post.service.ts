import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../../shared/base-http.service';

@Injectable()
export class AdminPostService extends BaseService {

    constructor(protected http: Http) {
        super(http);
    }

    public getById(id: any): Observable<any> {
        return this.get(this.hostAPI + '/posts/' + id, this.options())
            .map(res => res.json());
    }

    public getList(): Observable<any> {
        return this.get(this.hostAPI + '/posts/', this.options())
            .map(res => res.json());
    }

    public save(newPost: any): Observable<any> {
        return this.post(this.hostAPI + '/posts/', newPost, this.authorisedOptions())
            .map(res => res.json());
    }
}