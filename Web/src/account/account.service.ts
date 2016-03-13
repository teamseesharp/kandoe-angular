﻿import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Account} from './model/account';

@Injectable()
export class AccountService {

    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');

    }

    public getAccount() {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var apiURL = 'http://kandoe-api.azurewebsites.net/api/accounts/by-auth0-user-id/' + profile.user_id;
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public patchAccount(account: Account) {
        var apiURL = 'http://kandoe-api.azurewebsites.net/api/accounts';
        console.log("verstuurde acc:" + JSON.stringify(account));
        return this.authHttp.patch(apiURL, JSON.stringify(account), { headers: this.header });
    }

    public accountFromJson(data: any): Account {
        var account: Account = new Account();
        account.id = data.Id;
        account.email = data.Email;
        account.name = data.Name;
        account.surname = data.Surname;
        account.secret = data.Secret;
        account.picture = data.Picture;
        account.chatMessages = data.ChatMessages;
        account.organisations = data.Organisations;
        account.organisedSessions = data.OrganisedSessions;
        account.participatingSessions = data.ParticipatingSessions;
        account.themes = data.themes;
        account.subthemes = data.subthemes;
        return account;
    }
}