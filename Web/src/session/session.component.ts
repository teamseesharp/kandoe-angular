import {Component, OnInit} from 'angular2/core';
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

import {SessionService} from './session.service';
import {CardService} from './card.service';
import {MessageService} from '../message/message.service';

import {SessionTypePipe} from './session-type.pipe';

import {SessionJsonMapper, ChatMessageJsonMapper, CardJsonMapper} from '../utility/json-mapper';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, RouterLink],
    templateUrl: 'src/session/session.html',
    pipes: [SessionTypePipe],
    providers: [SessionService, CardService, MessageService]
})

export class SessionComponent implements OnInit {

    private session: Session = new Session();
    private accounts: Array<Account> = [];
    private cards: Array<Card> = [];
    private cardGrid: Array<Array<CardSquare>> = [];
    private chatMessages: Array<Message> = [];
    public space: string;
    public progress: number = 0;
    public currentPlayer: number;
    public currentPlayerId: number;
    public card: Card = new Card();
    model = new Card();

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
                this.session = new SessionJsonMapper().sessionFromJson(data.json());
                this.cards = this.session.sessionCards;
                this.accounts = this.session.participants;
                this.currentPlayer = this.session.currentPlayerIndex;
                this.progress = this.calculatePlayerLine();
                console.log('init');
                this.initCardGrid();
            },
            err => console.log(err),
            () => console.log('Complete')
        );
        this.card.text = "";
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

    private calculateRadius(item: CardSquare): number {
        var r = Math.sqrt(Math.pow(item.xCoordinate, 2) + Math.pow(item.yCoordinate, 2));
        return r;
    }

    upvoteCard() {
        this._sessionService.patchSessionCardLevel(this.session, this.card.id)
            .subscribe(
            data => {
                this._router.navigate(['Home']);
                this._router.navigate(['Session', { id: this.session.id }]);
            },
            err => console.log(err),
            () => console.log('upvote complete')
            );
        console.log('upvote');
    }

    onCardClick(cardSquare: CardSquare) {
        if (cardSquare.card.text != '') {
            this.card = cardSquare.card;
            (<HTMLButtonElement>document.getElementById('btnShowUpvoteModal')).click();
        }
    }

    calculatePlayerLine() : number {
        var numberOfPlayers = this.accounts.length;
        var ball = 4.60;

        var result = (100 - (ball * numberOfPlayers)) / (numberOfPlayers + 1);

        this.space = "margin-left: " + result + "%;";
        this.currentPlayerId = this.session.participants[this.session.currentPlayerIndex - 1].id;
        return (result + ball) * this.currentPlayer;
    }

    addCard() {
        this._cardService.postCard(this.model)
            .subscribe(
            data => this.cards.push(new CardJsonMapper().cardFromJson(data.json())),
            err => console.log(err),
            () => console.log('Complete')
            );
        this.model = new Card();
    }

    onAddCard(cardToAdd: Card) {
         /*for (var index = 0; index < this.allCards.length; index++) {
            if (this.allCards[index] == cardToAdd) {
                this.allCards.splice(index, 1);
                this.myCards.push(cardToAdd);
                break;
            } 
        }  */
    }

    onRemoveCard(cardToRemove: Card) {
        /*for (var index = 0; index < this.myCards.length; index++) {
            if (this.myCards[index] == cardToRemove) {
                this.myCards.splice(index, 1);
                this.allCards.push(cardToRemove);
                break;
            }
        }*/
    }

    submitCards() {
        //Todo allCards lijst meegeven aan backend, gekozen kaarten zijn er niet meer bij.
    }

    getChatMessages() {
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

    addChatMessage() {
        var message: Message = new Message();
        message.sessionId = parseInt(this._routeParams.get('id'));
        message.text = (<HTMLInputElement>document.getElementById('chatMessageInput')).value;
        message.messengerId = parseInt(localStorage.getItem('user_id'));

        this._messageService.postMessage(message)
            .subscribe(
            data => this.chatMessages.push(new ChatMessageJsonMapper().chatMessageFromJson(data.json())),
            err => console.log(err),
            () => console.log('Chatmessage added')
            );
    }
}