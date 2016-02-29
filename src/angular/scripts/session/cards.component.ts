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
    model = new Card(3, "Dit is een kaartje voor de heraanleg van het voetbalveld");
    submitted = false;
    
    constructor() {
        this.cards = [
            new Card(1, "Dit is een kaartje voor het verlagen van een verkeersdrempel in de gemeente"),
            new Card(2, "Dit is een kaartje voor het organiseren van een wielerwedstrijd")
        ];
    }

    onSubmit() {
        this.submitted = true;
    }
}