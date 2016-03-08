import {Component, View} from 'angular2/core';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Card} from './model/card';

@Component({
})

@View({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'Views/session/Cards.html'
})

export class CardsComponent {

    public cards: Array<Card>;
    model = new Card("", 0);
    submitted = false;
    
    constructor() {
        this.cards = [
            new Card("Kaartje voor verlaging verkeersdrempel", 0),
            new Card("Kaartje voor organisatie wielerwedstrijd", 0),
            new Card("Verkiezing verantwoordelijke studentenraad", 1),
            new Card("Een ander kaartje", 1),
            new Card("Het vijfde kaartje", 0),
            new Card("Het allerlaatste kaartje", 0)
        ];
    }

    onCreateCard() {
        this.cards.push(this.model);
        this.onCloseModal();
    }

    onChangeModal(card: Card) {
        this.model = card;
        //todo: kaart effectief toevoegen
    }

    onChangeCard() {
        //todo kaart effectief wijzigen
        this.onCloseModal();
    }

    onCloseModal(){
        this.model = new Card("", 0);
    }
}