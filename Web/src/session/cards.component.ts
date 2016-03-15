import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Card} from './model/card';
import {CardService} from './card.service';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/session/cards.html',
    providers: [CardService]
})

export class CardsComponent {

    public cards: Array<Card>;
    model = new Card();
    submitted = false;
    cardToChange: Card;

    constructor(private _router: Router, private _routeParams: RouteParams, private _cardService: CardService) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        _cardService.getCardsBySubtheme(parseInt(this._routeParams.get('id')))
            .subscribe(
            data => this.cards = _cardService.cardsFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete card')
            );
        //this.initializeCards();
    }

    initializeCards() {
        this.cards = [];
        var cardStrings = ["Kaartje voor verlaging verkeersdrempel", "Kaartje voor organisatie wielerwedstrijd", "Verkiezing verantwoordelijke studentenraad", "Een ander kaartje", "Het allerlaatste kaartje"];
        for (var i = 0; i < 5; i++) {
            var card = new Card();
            card.text = cardStrings[i];
        }
    }

    onSubmit() {
        this.cards.push(this.model);
        this.onCloseModal();
    }

    onChangeModal(card: Card) {
        this.model = card;
        this.cardToChange = card;
        //todo: kaart effectief toevoegen
    }

    onCloseModal() {
        this.model = new Card();
    }

    onCreateCard() {
        this.cards.push(this.model);
        //Todo kaart pushen
        this.onCloseModal();
    }

    onChangeCard() {
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i] === this.cardToChange) {
                this.cards[i].text = this.model.text;
            }
        }
        this.onCloseModal();
    }
}