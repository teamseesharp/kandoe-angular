//import {Component, View, OnInit} from 'angular2/core';
import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session} from './model/session';
import {SessionType} from './model/session';
import {SessionTypePipe} from './session-type.pipe';
//import {Account} from './account/model/account';
import {Card} from './model/card';


@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, RouterLink],
    templateUrl: 'Views/session/Session.html',
    pipes: [SessionTypePipe]
})

export class SessionComponent implements OnInit {

    public session: Session;
    //players: Array<Account>;
    public players: Array<String>;
    public myCards: Array<Card>;

    constructor(private _router: Router, private _routeParams: RouteParams) {
        this.players = [];

    }

    ngOnInit() {
        //vervangen door api call, get van session, id meegeven
        this.session = new Session("test.com", SessionType.sync, "", new Date(Date.now()), new Date(Date.now()));
        this.session.id = parseInt(this._routeParams.get('id'));
    }

    dummyData() {
        this.players.push("Caskraker");
        this.players.push("BenNietHier");
        this.players.push("ThoMasmurder");

        this.myCards.push(new Card("mijn eerste kaart"));
        this.myCards.push(new Card("tweede kaart"));
        this.myCards.push(new Card("laatste kaart"));
    }
}