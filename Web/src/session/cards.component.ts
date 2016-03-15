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
        _cardService.getCardsBySubtheme(parseInt(this._routeParams.get('subthemeId')))
            .subscribe(
            data => this.cards = _cardService.cardsFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete: number of cards ' + this.cards.length)
            );
    }

    onSubmit() {
        var cardToAdd: Card = new Card;
        cardToAdd = this.model;
        cardToAdd.subthemeId = parseInt(this._routeParams.get('subthemeId'));
        cardToAdd.themeId = parseInt(this._routeParams.get('themeId'));

        this._cardService.postCard(cardToAdd)
            .subscribe(
            data => this.cards.push(this._cardService.cardFromJson(data.json())),
            err => console.log(err),
            () => console.log('Complete card added')
            );
        this.onCloseModal();
    }

    onChangeModal(card: Card) {
        this.model = card;
        this.cardToChange = card;
    }

    onCloseModal() {
        this.model = new Card();
    }

    onChangeCard() {
        var changedCard: Card = new Card();
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i] == this.cardToChange) {
                //todo: kaart effectief wijzigen
                this._cardService.putCard(this.model)
                    .subscribe(
                    data => changedCard = this._cardService.cardFromJson(data.json()),
                    err => console.log(err),
                    () => console.log('Complete card change')
                );
                console.log('HIER' + this.cards[i].text)
                this.cards[i].text = changedCard.text;                
            }
        }
        this.onCloseModal();
    }
}