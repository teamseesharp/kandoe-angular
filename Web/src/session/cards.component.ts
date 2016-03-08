import {Component} from 'angular2/core';
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
    cardModel = new Card("", 0);
    submitted = false;
    
    constructor(private _router: Router) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
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