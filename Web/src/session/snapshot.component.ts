import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session} from './model/session';
import {SessionType} from './model/session';
import {Card} from './model/card';
import {CardSquare} from './model/card-square';
import {Message} from '../message/model/message';

import {SessionService} from './session.service';
import {CardService} from './card.service';
import {MessageService} from '../message/message.service';

import {SessionTypePipe} from './session-type.pipe';

import {SessionJsonMapper, ChatMessageJsonMapper, CardJsonMapper} from '../utility/json-mapper';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, RouterLink],
    templateUrl: 'src/session/snapshot.html',
    pipes: [SessionTypePipe],
    providers: [SessionService, CardService, MessageService]
})

export class SnapshotComponent implements OnInit {

    private session: Session = new Session();
    private cards: Array<Card> = [];
    private cardGrid: Array<Array<CardSquare>> = [];
    private chatMessages: Array<Message> = [];

    constructor(private _router: Router,
        private _routeParams: RouteParams,
        private _sessionService: SessionService,
        private _messageService: MessageService,
        private _cardService: CardService) {
        // default value, used in custom.js to load the javascript for the chat
        localStorage.setItem('isChatActive', "false");
        _sessionService.getSessionVerbose(parseInt(_routeParams.get('id')))
            .subscribe(
            data => {
                console.log(data.json());
                this.session = new SessionJsonMapper().sessionFromJson(data.json());
                this.cards = this.session.sessionCards;
                this.initCardGrid();
            },
            err => console.log(err),
            () => console.log('Complete')
        );
        this._messageService.getMessagesBySession(parseInt(this._routeParams.get('id')))
            .subscribe(
            data => {
                this.chatMessages = new ChatMessageJsonMapper().chatMessagesFromJson(data.json());
                console.log(this.chatMessages);
            },
            err => console.log(err),
            () => console.log('Complete get messages')
            );
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
        var skipSquares: boolean = false;
        for (var i in this.cardGrid) {
            //
            if (parseInt(i) % 2 == 0) skipSquares = false;
            for (var j in this.cardGrid[i]) {
                if (cardIndex < cards.length && !skipSquares && this.cardGrid[i][j].level == cards[cardIndex].sessionLevel) {
                    this.cardGrid[i][j].card = cards[cardIndex];
                    this.cardGrid[i][j].setVisibility();
                    cardIndex++;
                    skipSquares = true;
                }
            }
        }
    }
}