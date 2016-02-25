import {Component, View} from 'angular2/core';
import {LoginFormComponent} from './login-form.component';
import {RegisterFormComponent} from './register-form.component';

@Component({
})
@View({
    directives: [LoginFormComponent, RegisterFormComponent],
    templateUrl: 'Views/account/Account.html'
})

export class AccountFormsComponent {
}