import {Component} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session} from './model/session';
import {Card} from './model/card';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/session/analysis.html'

})

export class AnalysisComponent {
    private cardToMerge: Card;

    private masterCircle(sessions: Array<Session>) : Session {
        var master = sessions[0];

        for (var i = 1; 1 < sessions.length; i++) {
            for (var j = 0; j < sessions[i].sessionCards.length; j++) {
                if (this.cardsInDeck(sessions[i].sessionCards[j], master.sessionCards)) {
                    master.sessionCards.push(this.mergeCards(sessions[i].sessionCards[j], this.cardToMerge))
                    master.sessionCards.splice(j);
                } else {
                    master.sessionCards.push(sessions[i].sessionCards[j]);
                }
            }
        }

        return master;
    }

    private cardsInDeck(card: Card, deck: Array<Card>): boolean {
        for (var i = 1; 1 < deck.length; i++) {
            if (card === deck[i]) {
                this.cardToMerge = card;
                return true;
            }
        }
        return false;
    }

    private mergeCards(first: Card, second: Card): Card {
        var newSessionLevel = (first.sessionLevel + second.sessionLevel) / 2;
        this.cardToMerge.sessionLevel = newSessionLevel;
        return this.cardToMerge;
    }
} 