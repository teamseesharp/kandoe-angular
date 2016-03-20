import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';
import {SessionComponent} from '../session/session.component';

import {Session} from './model/session';
import {SessionType} from './model/session';
import {Account} from '../account/model/account';
import {Card} from './model/card';
import {CardSquare} from './model/card-square';
import {Message} from '../message/model/message';
import {ChatboxMessage} from '../message/model/chatboxMessage';

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
    private accounts: Array<Account> = [];
    private cards: Array<Card> = [];
    private cardGrid: Array<Array<CardSquare>> = [];
    private messages: Array<Message> = [];
    private chatboxMessages: Array<ChatboxMessage> = [];
    private noChat: boolean;

    constructor(private _router: Router,
        private _routeParams: RouteParams,
        private _sessionService: SessionService,
        private _messageService: MessageService,
        private _cardService: CardService) {

        _sessionService.getSessionVerbose(parseInt(_routeParams.get('id')))
            .subscribe(
            data => {
                console.log(data.json());
                this.session = new SessionJsonMapper().sessionFromJson(data.json());
                this.accounts = this.session.participants;
                this.cards = this.session.sessionCards;
                this.initCardGrid();
                this.getChatMessages();
            },
            err => console.log(err),
            () => console.log('Complete')
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

    public checkForMessages() {
        if (this.chatboxMessages.length < 1) {
            this.noChat = true;
        }
    }

    private getChatMessages() {
        this._messageService.getMessagesBySession(parseInt(this._routeParams.get('id')))
            .subscribe(
            data => {
                var numberOfCurrentMessages = this.chatboxMessages.length;
                this.messages = new ChatMessageJsonMapper().chatMessagesFromJson(data.json());

                // get for each chatmessage the coupled Account
                for (var i = numberOfCurrentMessages; i < this.messages.length; i++) {
                    for (var j = 0; j < this.accounts.length; j++) {
                        if (this.accounts[j].id == this.messages[i].messengerId) {
                            this.chatboxMessages.push(new ChatboxMessage(this.messages[i], this.accounts[j].id, this.accounts[j].name, this.accounts[j].picture));
                            break;
                        }
                    }
                }
                this.checkForMessages();
            },
            err => console.log(err),
            () => console.log('Complete get messages')
            );
    }
}