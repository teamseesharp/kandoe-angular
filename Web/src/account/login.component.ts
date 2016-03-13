import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Router} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';

import {Account} from '../account/model/account';

declare var Auth0Lock;

@Component({
    selector: 'login-form',
    templateUrl: 'src/account/login.html'
})

export class LoginComponent implements OnInit {

    lock = new Auth0Lock('oFgQBmfslHqeahYk2ivNNAzkgcPgwTa8', 'kandoe.eu.auth0.com');
    jwtHelper: JwtHelper = new JwtHelper();
    model = new Account();

    constructor(private _router: Router, public http: Http, public authHttp: AuthHttp) {
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

            this._router.navigate(['Home']);
        });
    }

    loggedIn() {
        return tokenNotExpired();
    }

    get diagnostic() { return JSON.stringify(this.model); }
}