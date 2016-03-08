import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Account} from '../account/model/account';
import {Http, Response} from 'angular2/http';

@Component({
    selector: 'register-form',
    templateUrl: 'src/account/register-form.html'
})

export class RegisterFormComponent {
    //model = new Account("helsen.bennie@hotmail.be", "Test1234");
    model = new Account("", "");

    constructor() {
    }

    submitted = false;

    onSubmit() {
        //this.http.get('')

        this.submitted = true;
    }

    get diagnostic() { return JSON.stringify(this.model); }
}