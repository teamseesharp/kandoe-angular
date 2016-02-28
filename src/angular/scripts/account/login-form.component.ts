import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Router} from 'angular2/router';
import {Login} from '../account/model/login';

@Component({
    selector: 'login-form',
    templateUrl: 'Views/account/login/Login-form.component.html'
})

export class LoginFormComponent {
    constructor(private _router: Router) {
    }

    model = new Login(1, "Bennie", "Helsen");

    submitted = false;

    onSubmit() {
        this.submitted = true;
        this._router.navigate(['Home']);
    }

    get diagnostic() { return JSON.stringify(this.model); }
}