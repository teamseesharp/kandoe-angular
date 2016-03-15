import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {Session} from '../session/model/session';
import {SessionType} from '../session/model/session';
import {Organisation} from '../session/model/organisation';
import {Theme} from '../session/model/theme';
import {Card} from '../session/model/card';
import {Account} from '../account/model/account';
import {AccountService} from '../account/account.service';
import {tokenNotExpired} from 'angular2-jwt';

@Component({
    selector: 'sidebar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'src/defaultcomponents/sidebar.html',
    providers: [AccountService] 
})

export class SidebarComponent {

    public account: Account = new Account();

    constructor(private _accountService: AccountService) {
        if (tokenNotExpired()) {
            _accountService.getAccountByUserId(localStorage.getItem('user_id'))
            .subscribe(
            data => this.account = _accountService.accountFromJson(data.json()),
            err => console.log(err),
            () => console.log('Sidebar complete')
            );}
    }
}