﻿import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Card} from './model/card';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/session/cards.html'
})

export class CardsComponent {

    public cards: Array<Card>;
    model = new Card("", 0);
    submitted = false;
    cardToChange: Card;
    
    constructor(private _router: Router) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        this.cards = [
            new Card("Kaartje voor verlaging verkeersdrempel", 0),
            new Card("Kaartje voor organisatie wielerwedstrijd", 0),
            new Card("Verkiezing verantwoordelijke studentenraad", 1),
            new Card("Een ander kaartje", 1),
            new Card("Het vijfde kaartje", 0),
            new Card("Het allerlaatste kaartje", 0)
        ];
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
        this.model = new Card("", 0);
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