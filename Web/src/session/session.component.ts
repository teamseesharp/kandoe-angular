﻿import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

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
import {AccountService} from '../account/account.service';

import {SessionTypePipe} from './session-type.pipe';

import {SessionJsonMapper, ChatMessageJsonMapper, CardJsonMapper, AccountJsonMapper} from '../utility/json-mapper';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, RouterLink],
    templateUrl: 'src/session/session.html',
    pipes: [SessionTypePipe],
    providers: [SessionService, CardService, MessageService, AccountService]
})

export class SessionComponent implements OnInit, OnDestroy {

    private session: Session = new Session();
    private accounts: Array<Account> = [];
    private sessionCards: Array<Card> = [];
    private cardGrid: Array<Array<CardSquare>> = [];
    private messages: Array<Message> = [];
    private chatboxMessages: Array<ChatboxMessage> = [];
    public space: string;
    public progress: number = 0;
    public loggedInUserId: number = parseInt(localStorage.getItem('user_id'));
    public currentPlayerIndex: number;
    public currentPlayerId: number;
    public card: Card = new Card();
    model = new Card();
    private accountId: number;
    private interval: any;

    constructor(private _router: Router,
        private _routeParams: RouteParams,
        private _sessionService: SessionService,
        private _messageService: MessageService,
        private _cardService: CardService,
        private _accountService: AccountService) {
        // default value, used in custom.js to load the javascript for the chat
        localStorage.setItem('isChatActive', "false");
        this.accountId = parseInt(localStorage.getItem('user_id'));
        this.initializeData();
        this.card.text = "";
        this.interval = window.setInterval(() => {
            this._sessionService.getSessionVerbose(this.session.id)
                .subscribe(
                data => {
                    var newSession = new SessionJsonMapper().sessionFromJson(data.json());
                    if (localStorage.getItem("isSessionLoaded") == "false") {
                        localStorage.setItem("isSessionLoaded", "true");
                        window.location.reload();
                    }
                    for (var c in newSession.sessionCards) {
                        if (this.session.sessionCards[c] != null && newSession.sessionCards[c].sessionLevel != this.session.sessionCards[c].sessionLevel) {
                            window.location.reload();
                        }
                    }
                },
                err => console.log(err),
                () => console.log('Session change check complete')
            );
        }, 1000);
    }

    ngOnDestroy() {
        window.clearInterval(this.interval);
    }

    ngOnInit() {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
    }

    private initializeData() {
        this._sessionService.getSessionVerbose(parseInt(this._routeParams.get('id')))
        .subscribe(
        data => {
            console.log(data.json());
            this.session = new SessionJsonMapper().sessionFromJson(data.json());
            this.sessionCards = this.session.sessionCards;
            this.accounts = this.session.participants;
            this.currentPlayerIndex = this.session.currentPlayerIndex;
            this.progress = this.calculatePlayerLine();
            this.initCardGrid();
        },
        err => console.log(err),
        () => console.log('Complete')
        );
    }

    private initializePlayerCards(cards: Array<Card>) {

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
        for (var i = 0; i < this.cardGrid.length; i++) {
            if (i % 2 == 0) skipSquares = false;
            for (var j in this.cardGrid[i]) {
                if (cardIndex < cards.length && !skipSquares && this.cardGrid[i][j].level == cards[cardIndex].sessionLevel
                    && this.cardGrid[i][j].visibility == "opacity: 0") {
                    this.cardGrid[i][j].card = cards[cardIndex];
                    this.cardGrid[i][j].setVisibility();
                    cardIndex++;
                    if (cardIndex % 10 == 0) { i = 0; }
                    skipSquares = true;
                }
            }
        }
    }

    private calculateRadius(item: CardSquare): number {
        var r = Math.sqrt(Math.pow(item.xCoordinate, 2) + Math.pow(item.yCoordinate, 2));
        return r;
    }
    
    upvoteCard() {
        this._sessionService.patchSessionCardLevel(this.session, this.card.id)
            .subscribe(
            err => console.log(err),
            () => console.log('upvote complete')
            );
        console.log('upvote');
    }

    onCardClick(cardSquare: CardSquare) {
        if (cardSquare.card.text != '') {
            (<HTMLButtonElement>document.getElementById('btnShowUpvoteModal')).click();
            this.card = cardSquare.card;
        }
    }

    calculatePlayerLine() : number {
        var numberOfPlayers = this.accounts.length;
        var ball = 4.60;

        var result = (100 - (ball * numberOfPlayers)) / (numberOfPlayers + 1);

        this.space = "margin-left: " + result + "%;";
        this.currentPlayerId = this.accounts[this.currentPlayerIndex].id;
        return (result + ball) * (this.currentPlayerIndex + 1);
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
            },
            err => console.log(err),
            () => console.log('Complete get messages')
            );
    }

    addChatMessage() {
        var message: Message = new Message();
        message.sessionId = parseInt(this._routeParams.get('id'));
        message.text = (<HTMLInputElement>document.getElementById('chatMessageInput')).value;
        message.messengerId = parseInt(localStorage.getItem('user_id'));

        this._messageService.postMessage(message)
            .subscribe(
            data => this.getChatMessages(),
            err => console.log(err),
            () => console.log('Chatmessage added')
            );
    }
}