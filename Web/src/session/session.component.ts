import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session} from './model/session';
import {SessionType} from './model/session';
import {Account} from '../account/model/account';
import {Card} from './model/card';
import {CardContainer} from './model/cardContainer';

import {SessionTypePipe} from './session-type.pipe';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, RouterLink],
    templateUrl: 'src/session/session.html',
    pipes: [SessionTypePipe]
})

export class SessionComponent implements OnInit {

    private session: Session;
    private tooltipText: string;
    private players: Array<Account>;
    private myCards: Array<Card>;
    private cardGrid: Array<Array<CardContainer>> = [];

    constructor(private _router: Router, private _routeParams: RouteParams) {
        this.session = new Session("test.com", SessionType.sync, "", new Date(Date.now()), new Date(Date.now()));
        this.session.id = parseInt(this._routeParams.get('id'));
        this.players = [];
        this.tooltipText = "";
        this.initCardGrid();
    }

    ngOnInit() {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
    }

    private dummyData() {
        this.myCards.push(new Card("mijn eerste kaart", 0));
        this.myCards.push(new Card("tweede kaart", 0));
        this.myCards.push(new Card("laatste kaart", 0));
    }

    private initCardGrid() {
        for (var i = -10; i <= 10; i++) {
            var tempArray = new Array<CardContainer>();
            for (var j = -10; j <= 10; j++) {
                if (j != 0) {
                    tempArray.push(new CardContainer(i, j, new Card("", 0)));
                }
            }
            if (i != 0) {
                this.cardGrid.push(tempArray);
            }
        }
        this.cardGrid[5][7].card = new Card("Dit is een kaart", 0);
        this.cardGrid[5][7].setVisibility();
    }

    private calculateRadius(item: CardContainer): number {
        var r = Math.sqrt(Math.pow(item.xCoordinate, 2) + Math.pow(item.yCoordinate, 2));
        return Math.round(r);
    }

    setCardTooltipText(item: CardContainer) {
        console.log(item.card.text);
        if (item.card != null) { this.tooltipText = item.card.text };
        console.log(this.tooltipText);
    }

    placeTestCard() {
        this.cardGrid[15][17].card = new Card("Dit is een andere kaart", 0);
        this.cardGrid[15][17].setVisibility();
        window.location.reload();
    }

    //testing math.. math awesomeness in progress.. remove this later pl0x..
    clickTest(item: CardContainer) {
        var r = this.calculateRadius(item);
        if (r <= 10 && r >= -10) {
            item.card = new Card("Dit is een kaart", 0);
            item.setVisibility();
        }
        alert("text: "
            + item.card.text
            + " | straal: "
            + r
            + " | coordinates: "
            + item.xCoordinate
            + ", "
            + item.yCoordinate);
    }
}