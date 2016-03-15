import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {Session} from '../session/model/session';
import {SessionType} from '../session/model/session';
import {Organisation} from '../session/model/organisation';
import {Theme} from '../session/model/theme';
import {Card} from '../session/model/card';

import {AccountService} from '../account/account.service';

@Component({
    selector: 'sidebar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'src/defaultcomponents/sidebar.html',
    providers: [AccountService] 
})

export class SidebarComponent {

    public profileName: string;

    constructor(private _accountService: AccountService) {
        _accountService.getAccountByUserId(localStorage.getItem('user_id'))
            .subscribe(
            data => this.profileName = _accountService.accountFromJson(data.json()).name,
            err => console.log(err),
            () => console.log('Sidebar complete')
            );
    }
}