﻿import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Account} from './model/account';

@Injectable()
export class AccountService {
    public apiPrefix: string = 'http://kandoe-api.azurewebsites.net/';
    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');
    }

    public getAccountByAuth0UserId() {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var apiURL = this.apiPrefix + 'api/accounts/by-auth0-user-id/' + profile.user_id;
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public getAccountByUserId(id: string) {
        var apiURL = this.apiPrefix + 'api/accounts/' + id;
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public postAccountByAuth0UserId(account: Account) {
        var apiURL = this.apiPrefix + 'api/accounts';
        return this.authHttp.post(apiURL, JSON.stringify(account), { headers: this.header });
    }

    public patchAccount(account: Account) {
        var apiURL = this.apiPrefix + 'api/accounts';
        return this.authHttp.patch(apiURL, JSON.stringify(account), { headers: this.header });
    }
}