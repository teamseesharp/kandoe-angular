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
    private accounts: Array<Account>;
    private allCards: Array<Card>;
    private myCards: Array<Card>;
    private cardGrid: Array<Array<CardContainer>> = [];
    public space: string;
    public progress: number;
    public currentPlayer: number;

    constructor(private _router: Router, private _routeParams: RouteParams) {
        this.session = new Session("test.com", SessionType.sync, "", new Date(Date.now()), new Date(Date.now()));
        this.session.id = parseInt(this._routeParams.get('id'));
        this.accounts = [];
        this.allCards = [];
        this.myCards = [];
        this.currentPlayer = 4;
        this.progress = 0;
        this.tooltipText = "";
        this.dummyData();
        this.initCardGrid();
        this.calculatePlayerLine();
    }

    ngOnInit() {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
    }

    private dummyData() {
        this.accounts.push(new Account("cas.craker@gmail.com", "cas"));
        this.accounts[0].firstname = "Cas";
        this.accounts[0].name = "Craker";

        this.accounts.push(new Account("bennie.thier@gmail.com", "ben"));
        this.accounts[1].firstname = "Bennie";
        this.accounts[1].name = "thier";

        this.accounts.push(new Account("thomas.urder@gmail.com", "tom"));
        this.accounts[2].firstname = "thomas";
        this.accounts[2].name = "urder";

        this.accounts.push(new Account("michelle.lvb@gmail.com", "mic"));
        this.accounts[3].firstname = "Michelle";
        this.accounts[3].name = "Lekkers Van Beckers";

        this.accounts.push(new Account("joachim.dewinnaar@gmail.com", "joa"));
        this.accounts[4].firstname = "Joachim";
        this.accounts[4].name = "DeWinnaar";
  
        this.accounts.push(new Account("olivier.kant@gmail.com", "oli"));
        this.accounts[5].firstname = "Olivier";
        this.accounts[5].name = "kant";

        this.accounts.push(new Account("wouter@gmail.com", "wou"));
        this.accounts[6].firstname = "Wouter";
        this.accounts[6].name = "Deketelare";
      
        this.accounts.push(new Account("bartje.vochten@gmail.com", "bar"));
        this.accounts[7].firstname = "Bart";
        this.accounts[7].name = "Vochten";
        
        this.allCards.push(new Card("mijn eerste kaart", 0));
        this.allCards.push(new Card("tweede kaart", 0));
        this.allCards.push(new Card("Kaartje voor verlaging verkeersdrempel", 0));
        this.allCards.push(new Card("Kaartje voor organisatie wielerwedstrijd", 0));
        this.allCards.push(new Card("Verkiezing leider studentenraad", 1));
        this.allCards.push(new Card("Een ander kaartje", 1));
        this.allCards.push(new Card("Het vijfde kaartje", 0));
        this.allCards.push(new Card("Het allerlaatste kaartje", 0));
        this.allCards.push(new Card("laatste kaart", 0));
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

    calculatePlayerLine() {
        var numberOfPlayers = this.accounts.length;
        var bol = 4.65;

        var result = (100 - (bol * numberOfPlayers)) / (numberOfPlayers + 1);

        this.space = "margin-left: " + result + "%;";
        this.progress = (result + bol) * this.currentPlayer;
    }

    onAddCard(cardToAdd: Card) {
         for (var index = 0; index < this.allCards.length; index++) {
            if (this.allCards[index] === cardToAdd) {
                this.allCards.splice(index, 1);
                this.myCards.push(cardToAdd);
                break;
            } 
        }
         
         
    }

    onRemoveCard(cardToRemove: Card) {
        for (var index = 0; index < this.myCards.length; index++) {
            if (this.myCards[index] === cardToRemove) {
                this.myCards.splice(index, 1);
                this.allCards.push(cardToRemove);
                break;
            }
        }
    }

    submitCards() {
        //Todo allCards lijst meegeven aan backend, gekozen kaarten zijn er niet meer bij.
    }

}