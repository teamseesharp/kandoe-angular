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
import {CardSquare} from './model/card-square';

import {SessionService} from './session.service';
import {CardService} from './card.service';

import {SessionTypePipe} from './session-type.pipe';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, RouterLink],
    templateUrl: 'src/session/session.html',
    pipes: [SessionTypePipe],
    providers: [SessionService, CardService]
})

export class SessionComponent implements OnInit {

    private session: Session = new Session();
    private tooltipText: string;
    private accounts: Array<Account>;
    private allCards: Array<Card>;
    private myCards: Array<Card>;
    private cardGrid: Array<Array<CardSquare>> = [];
    public space: string;
    public progress: number;
    public currentPlayer: number;

    constructor(private _router: Router, private _routeParams: RouteParams, private _sessionService: SessionService) {
        _sessionService.getSessionVerbose(parseInt(_routeParams.get('id')))
            .subscribe(
            data => {
                this.session = _sessionService.sessionFromJson(data.json());
                this.initCardGrid();
            },
            err => console.log(err),
            () => console.log('Complete')
        );
        this.accounts = [];
        this.allCards = [];
        this.myCards = [];
        this.currentPlayer = 4;
        this.progress = 0;
        this.tooltipText = "";
        this.calculatePlayerLine();
    }

    ngOnInit() {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
    }

    private initCardGrid() {
        for (var i = -10; i <= 10; i++) {
            var tempArray = new Array<CardSquare>();
            for (var j = -10; j <= 10; j++) {
                if (j != 0) {
                    var card: Card = new Card();
                    card.text = '';
                    tempArray.push(new CardSquare(i, j, card));
                }
            }
            if (i != 0) {
                this.cardGrid.push(tempArray);
            }
        }
        this.placeCards();
    }

    private placeCards() {
        var cards: Array<Card> = this.session.sessionCards;
        var cardIndex: number = 0;
        var skipSquares: boolean;
        for (var i in this.cardGrid) {
            //
            if (parseInt(i) % 5 == 0) skipSquares = false;
            for (var j in this.cardGrid[i]) {
                if (cardIndex < cards.length && !skipSquares && this.cardGrid[i][j].level == cards[cardIndex].sessionLevel) {
                    console.log('lengte: ' + cards.length + ' index: ' + cardIndex);
                    this.cardGrid[i][j].card = cards[cardIndex];
                    this.cardGrid[i][j].setVisibility();
                    console.log(this.cardGrid[i][j].card.text);
                    cardIndex++;
                    skipSquares = true;
                }
            }
        }
    }

    private calculateRadius(item: CardSquare): number {
        var r = Math.sqrt(Math.pow(item.xCoordinate, 2) + Math.pow(item.yCoordinate, 2));
        return Math.round(r);
    }

    setCardTooltipText(item: CardSquare) {
        console.log(item.card.text);
        if (item.card != null) { this.tooltipText = item.card.text };
        console.log(this.tooltipText);
    }

    placeTestCard() {
        this.cardGrid[15][17].card = new Card();
        this.cardGrid[15][17].card.text = "Dit is een andere kaart";
        this.cardGrid[15][17].setVisibility();
        window.location.reload();
    }

    //testing math.. math awesomeness in progress.. remove this later pl0x..
    clickTest(item: CardSquare) {
        var r = this.calculateRadius(item);
        if (r <= 10 && r >= -10) {
            item.card = new Card();
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
            if (this.myCards[index] == cardToRemove) {
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