import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Router} from 'angular2/router';
import {Account} from '../account/model/account';
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';

declare var Auth0Lock;

@Component({
    selector: 'login-form',
    templateUrl: 'src/account/login-form.html'
})

export class LoginFormComponent {

    lock = new Auth0Lock('oFgQBmfslHqeahYk2ivNNAzkgcPgwTa8', 'kandoe.eu.auth0.com');
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private _router: Router, public http: Http, public authHttp: AuthHttp) {
    }

    model = new Account("test", "test");

    submitted = false;

    onSubmit() {
        this.submitted = true;
        this._router.navigate(['Home']);
    }

    login() {
        this.lock.show((err: string, profile: string, id_token: string) => {

            if (err) {
                throw new Error(err);
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);

            this._router.navigate(['Home']);
        });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }

    loggedIn() {
        return tokenNotExpired();
    }

    get diagnostic() { return JSON.stringify(this.model); }
}