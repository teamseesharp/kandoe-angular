import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Register} from '../account/model/register';

@Component({
    selector: 'register-form',
    templateUrl: 'Views/account/register/Register-form.component.html'
})

export class RegisterFormComponent {
    model = new Register(1, "Bennie", "Helsen", "helsen.bennie@hotmail.be", "Test1234");

    submitted = false;

    onSubmit() { this.submitted = true; }

    get diagnostic() { return JSON.stringify(this.model); }
}