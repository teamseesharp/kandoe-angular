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
    cardModel = new Card("", 0);
    submitted = false;
    
    constructor() {
        this.cards = [
            new Card("Dit is een kaartje voor het verlagen van een verkeersdrempel in de gemeente", 0),
            new Card("Dit is een kaartje voor het organiseren van een wielerwedstrijd", 0)
        ];
    }

    onSubmit() {
        alert("nieuwe kaart: " + this.cardModel.text);
        this.submitted = true;
    }
}