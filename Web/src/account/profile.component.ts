import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Account} from './model/account';
import {AccountService} from './account.service';
import {AccountJsonMapper} from '../utility/json-mapper';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/account/profile.html',
    providers: [AccountService]
})

export class ProfileComponent {
    model = new Account();
    private account: Account = new Account();

    constructor(private _router: Router, private _accountService: AccountService) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        _accountService.getAccountByUserId(localStorage.getItem('user_id'))
            .subscribe(
            data => this.model = new AccountJsonMapper().accountFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete')
        );
    }

    onSubmit() {
        var picture = document.getElementById('profilepicture').innerText;
        if (picture.length > 0) {
            this.model.picture = "http://i.imgur.com/" + picture + ".png";
        }
        this._accountService.patchAccount(this.model)
            .subscribe(
            err => console.log(err),
            () => console.log('Request Complete')
            );
    }
}