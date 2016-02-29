import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Router} from 'angular2/router';
import {Login} from '../account/model/login';
import {HTTP_PROVIDERS, Http} from "angular2/http";

declare var Auth0Lock;

@Component({
    selector: 'login-form',
    templateUrl: 'Views/account/login/Login-form.component.html'
})

export class LoginFormComponent {
    lock = new Auth0Lock('oFgQBmfslHqeahYk2ivNNAzkgcPgwTa8', 'kandoe.eu.auth0.com');

    constructor(private _router: Router) {
    }

    model = new Login(1, "Bennie", "Helsen");

    submitted = false;

    onSubmit() {
        this.submitted = true;
        this._router.navigate(['Home']);
    }

    login() {
        this.lock.show(function (err: string, profile: string, id_token: string) {

            if (err) {
                throw new Error(err);
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);

        });
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }

    loggedIn() {
        //return tokenNotExpired();
    }

    get diagnostic() { return JSON.stringify(this.model); }
}