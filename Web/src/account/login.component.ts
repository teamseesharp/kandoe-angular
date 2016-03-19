import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Router} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';

import {Account} from '../account/model/account';
import {AccountService} from './account.service';
import {AccountJsonMapper} from '../utility/json-mapper';

declare var Auth0Lock;

@Component({
    selector: 'login-form',
    templateUrl: 'src/account/login.html',
    providers: [AccountService]
})

export class LoginComponent implements OnInit {

    lock = new Auth0Lock('oFgQBmfslHqeahYk2ivNNAzkgcPgwTa8', 'kandoe.eu.auth0.com');
    model = new Account();

    constructor(private _router: Router, public http: Http, public authHttp: AuthHttp, private _accountService: AccountService) {
    }

    ngOnInit() {
        this.login();
    }

    login() {
        this.lock.show({
            dict: 'nl',
            container: 'login-container',
            icon: 'http://i.imgur.com/Ito7Jwe.png'
        }, (err: string, profile: string, id_token: string) => {
            if (err) {
                throw new Error(err);
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);

            var acc: Account = new Account();
            acc.email = JSON.parse(localStorage.getItem('profile')).email;
            acc.name = JSON.parse(localStorage.getItem('profile')).nickname;
            acc.secret = JSON.parse(localStorage.getItem('profile')).user_id;

            this._accountService.postAccountByAuth0UserId(acc)
                .subscribe(
                data => {
                    acc = new AccountJsonMapper().accountFromJson(data.json());
                    localStorage.setItem('user_id', acc.id.toString());
                    console.log('going home');
                    this._router.navigate(['Home']);
                },
                err => console.log(err),
                () => console.log('Login complete')
            );
        });
    }

    loggedIn() {
        return tokenNotExpired();
    }

    get diagnostic() { return JSON.stringify(this.model); }
}