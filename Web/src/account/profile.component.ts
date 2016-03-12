import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Account} from './model/account';
import {AccountDTO} from './model/account.dto';
import {AccountService} from './account.service';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/account/profile.html',
    providers: [AccountService]
})

export class ProfileComponent {
    model = new Account("helsen.bennie@hotmail.be", "Test1234");
    submitted = false;
    private accountDTO: AccountDTO = new AccountDTO();

    constructor(private _router: Router, private _accountService: AccountService) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        _accountService.getAccount()
            .subscribe(
            data => console.log(data.json()),
            err => console.log(err),
            () => console.log('Complete')
        );
        console.log(this.accountDTO);
    }

    onSubmit() {
        this.submitted = true;
        //Todo call to backend

    }

    get diagnostic() { return JSON.stringify(this.model); }
}