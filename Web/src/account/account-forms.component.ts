import {Component} from 'angular2/core';
import {LoginFormComponent} from './login-form.component';
import {RegisterFormComponent} from './register-form.component';

@Component({
    directives: [LoginFormComponent, RegisterFormComponent],
    templateUrl: 'src/account/account.html'
})

export class AccountFormsComponent {
}