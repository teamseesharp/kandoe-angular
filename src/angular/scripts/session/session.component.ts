﻿import {Component} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session} from './model/session';
import {SessionType} from './model/session';
import {SessionTypePipe} from './session-type.pipe';
import {Account} from '../account/model/account';
import {Card} from './model/card';
import {CardContainer} from './model/cardContainer';


@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, RouterLink],
    templateUrl: 'Views/session/Session.html',
    pipes: [SessionTypePipe]
})

export class SessionComponent {

    public session: Session;
    //players: Array<Account>;
    public players: Array<String>;
    public myCards: Array<Card>;
    public cardGrid: Array<Array<CardContainer>> = [];

    constructor(private _router: Router, private _routeParams: RouteParams) {
        this.session = new Session("test.com", SessionType.sync, "", new Date(Date.now()), new Date(Date.now()));
        this.session.id = parseInt(this._routeParams.get('id'));
        this.players = [];
        this.initCardGrid();
    }

    private dummyData() {
        this.players.push("Caskraker");
        this.players.push("BenNietHier");
        this.players.push("ThoMasmurder");

        this.myCards.push(new Card("mijn eerste kaart", 0));
        this.myCards.push(new Card("tweede kaart", 0));
        this.myCards.push(new Card("laatste kaart", 0));
    }

    private initCardGrid() {
        for (var i = -10; i <= 10; i++) {
            var tempArray = new Array<CardContainer>();
            for (var j = -10; j <= 10; j++) {
                if (j != 0) {
                    tempArray.push(new CardContainer(i, j, null));
                }
            }
            if (i != 0) {
                this.cardGrid.push(tempArray);
            }
        }
    }

    //testing math.. math awesomeness in progress.. remove this later pl0x..
    clickTest(item: CardContainer) {
        var r = Math.sqrt(Math.pow(item.xCoordinate, 2) + Math.pow(item.yCoordinate, 2));
        var circle = "geen";
        if (Math.round(r) <= 10 && Math.round(r) >= -10) {
            item.card = new Card("Dit is een kaart", 0);
            item.setVisibility();
            circle = Math.round(r).toString();
        }
        alert("straal: "
            + r
            + " | zit in cirkel: "
            + circle
            + " | coordinates: "
            + item.xCoordinate
            + ", "
            + item.yCoordinate);
    }
}