import {Component} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {SessionTypePipe} from './session-type.pipe';
import {SessionParticipantsPipe} from './session-participants.pipe';

import {Session} from './model/session';
import {Card} from './model/card';
import {Subtheme} from './model/subtheme';
import {SubthemeService} from './subtheme.service';
import {SessionService} from './session.service';
import {CardService} from './card.service';
import {CardSquare} from './model/card-square';

import {SubthemeJsonMapper, SessionJsonMapper} from '../utility/json-mapper';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/session/analysis.html',
    pipes: [SessionTypePipe, SessionParticipantsPipe],
    providers: [SessionService, SubthemeService, CardService]
})

export class AnalysisComponent {
    private subthemes: Array<Subtheme>;
    private allSessions: Array<Session>;
    private selectedSessions: Array<Session>;
    private selectedSubthemeSessions: Array<Session>;
    private masterSession: Session = new Session();
    private sessionMasterHidden: boolean;
    private sessionEmptyHidden: boolean;
    private card: Card = new Card();
    private cardToMerge: Card = new Card();
    private cardGrid: Array<Array<CardSquare>> = [];

    constructor(private _router: Router, private _subthemeService: SubthemeService, private _sessionService: SessionService) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        this.sessionMasterHidden = true;
        this.sessionEmptyHidden = true;
        this.selectedSessions = new Array<Session>();
        this.selectedSubthemeSessions = new Array<Session>();
        this.getSubthemesByOrganiser();
        this.getAllSessions();
    }

    getSubthemesByOrganiser() {
        this._subthemeService.getSubthemesByOrganiser(localStorage.getItem('user_id'))
            .subscribe(
            data => {
                this.subthemes = new SubthemeJsonMapper().subthemesFromJson(data.json());
            },
            err => console.log(err),
            () => console.log('Complete: number of subthemes ' + this.subthemes.length)
            );
    }

    getAllSessions() {
        this._sessionService.getSessionsByUser()
            .subscribe(
            data => {
                console.log(data.json());
                this.allSessions = new SessionJsonMapper().sessionsFromJson(data.json());
            },
            err => console.log(err),
            () => console.log('Complete: number of sessions ' + this.allSessions.length)
            );
    }
    
    onSubmitSubthemeSessions() {
        this._sessionService.getSessionsBySubtheme(parseInt((<HTMLInputElement>document.getElementById('subthemeSelect')).value))
            .subscribe(
            data => {
                console.log(data.json());
                this.selectedSubthemeSessions = new SessionJsonMapper().sessionsFromJson(data.json());
                this.masterCircle(this.selectedSubthemeSessions);
            },
            err => console.log(err),
            () => console.log('Complete: get sessions from subtheme to analyse')
        );
    }
    
    onSubmitSessions() {
        this.masterCircle(this.selectedSessions);
    }

    onCardClick(cardSquare: CardSquare) {
        if (cardSquare.card.text != '') {
            (<HTMLButtonElement>document.getElementById('btnShowCardModal')).click();
            this.card = cardSquare.card;
        }
    }

    private masterCircle(sessions: Array<Session>) {
        try {
            this.masterSession = sessions[0];
            var firstDescription = this.masterSession.description;
            this.masterSession.description = firstDescription + " ";
            for (var i = 1; i < sessions.length; i++) {
                for (var j = 0; j < sessions[i].sessionCards.length; j++) {
                    if (this.cardsInDeck(sessions[i].sessionCards[j], this.masterSession.sessionCards)) {
                        this.mergeCards(sessions[i].sessionCards[j], this.cardToMerge);
                    } else {
                        this.masterSession.sessionCards.push(sessions[i].sessionCards[j]);
                    }
                }
                this.masterSession.description += ", " + sessions[i].description; 
            }
            if (this.masterSession.sessionCards.length > 0) {
                this.initCardGrid();
                this.sessionMasterHidden = false;
                this.sessionEmptyHidden = true;
            } else {
                this.sessionMasterHidden = true;
                this.sessionEmptyHidden = false;
            } 
        } catch (TypeError) {
            console.log("There are no sessions or no cards: " + Error);
            this.sessionMasterHidden = true;
            this.sessionEmptyHidden = false;
        }
    }

    public addSession() {
        if (this.allSessions.length > 0) {
            var sessionToAdd: Session = new Session();
            sessionToAdd = this.getSessionFromId(parseInt((<HTMLInputElement>document.getElementById('addSession')).value));

            this.selectedSessions.push(sessionToAdd);
            this.allSessions.splice(this.allSessions.indexOf(sessionToAdd), 1);
        }
    }

    public removeSession() {
        if (this.selectedSessions.length > 0) {
            var sessionToRemove: Session = new Session();
            sessionToRemove = this.getSessionFromId(parseInt((<HTMLInputElement>document.getElementById('removeSession')).value));

            this.allSessions.push(sessionToRemove);
            this.selectedSessions.splice(this.selectedSessions.indexOf(sessionToRemove), 1);
        }
    }

    private getSessionFromId(id: number): Session {
        for (var i: number = 0; i < this.allSessions.length; i++) {
            if (this.allSessions[i].id == id) {
                return this.allSessions[i];
            }
        }

        for (var i: number = 0; i < this.selectedSessions.length; i++) {
            if (this.selectedSessions[i].id == id) {
                return this.selectedSessions[i];
            }
        }
    }

    private cardsInDeck(card: Card, deck: Array<Card>): boolean {
        for (var i: number = 0; i < deck.length; i++) {
            if (card.text == deck[i].text) {
                console.log("card text: "+card.text);
                this.cardToMerge = deck[i];
                this.masterSession.sessionCards.splice(i);
                return true;
            }
        }
        return false;
    }

    private mergeCards(first: Card, second: Card) {
        console.log("level1: " + first.sessionLevel + " 2: " + second.sessionLevel);
        var newSessionLevel = Math.round((first.sessionLevel + second.sessionLevel) / 2);

        console.log("Merged card level " + newSessionLevel);
        this.cardToMerge.sessionLevel = newSessionLevel;
        this.masterSession.sessionCards.push(this.cardToMerge);
    }

    ngOnInit() {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
    }

    private initCardGrid() {
        this.resetAnalysis();
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
        var cards: Array<Card> = this.masterSession.sessionCards;
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

    public resetAnalysis() {
        if (this.selectedSubthemeSessions.length > 0) {
            this.selectedSubthemeSessions.splice(0, this.selectedSubthemeSessions.length);
        }
        if (this.selectedSessions.length > 0) {
            this.selectedSessions.splice(0, this.selectedSessions.length);
        }
        this.sessionEmptyHidden = true;
        this.sessionMasterHidden = true;
        this.cardGrid.splice(0, this.cardGrid.length);
        this.getAllSessions();
    }
} 