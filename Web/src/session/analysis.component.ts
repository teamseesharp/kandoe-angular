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
    subthemes: Array<Subtheme>;
    allSessions: Array<Session>;
    selectedSessions: Array<Session>;
    selectedSubthemeSessions: Array<Session>;
    //private cards: Array<Card> = [];
    masterSession: Session = new Session();
    public sessionMasterHidden: boolean;
    public sessionEmptyHidden: boolean;
    private cardToMerge: Card = new Card();
    private cardGrid: Array<Array<CardSquare>> = [];

    constructor(private _router: Router, private _subthemeService: SubthemeService, private _sessionService: SessionService) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        this.sessionMasterHidden = false;
        this.sessionEmptyHidden = true;
        this.selectedSessions = new Array<Session>();

        _subthemeService.getSubthemesByOrganiser(localStorage.getItem('user_id'))
            .subscribe(
            data => this.subthemes = new SubthemeJsonMapper().subthemesFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete: number of subthemes ' + this.subthemes.length)
        );

        _sessionService.getSessionsByUser()
            .subscribe(
            data => {
                this.allSessions = new SessionJsonMapper().sessionsFromJson(data.json());
                console.log(this.allSessions);
            },
            err => console.log(err),
            () => console.log('Complete: number of sessions ' + this.allSessions.length)
        );
        
    }
    
    onSubmitSubthemeSessions() {
        this._sessionService.getSessionsBySubtheme(parseInt((<HTMLInputElement>document.getElementById('subthemeSelect')).value))
            .subscribe(
            data => {
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

    private masterCircle(sessions: Array<Session>) {
        try {
            this.masterSession = sessions[0];
            var firstDescription = this.masterSession.description;
            this.masterSession.description = firstDescription + " "; 

            for (var i = 1; i < sessions.length; i++) {
                for (var j = 0; j < sessions[i].sessionCards.length; j++) {
                    if (this.cardsInDeck(sessions[i].sessionCards[j], this.masterSession.sessionCards)) {
                        this.masterSession.sessionCards.push(this.mergeCards(sessions[i].sessionCards[j], this.cardToMerge))
                        this.masterSession.sessionCards.splice(j);
                    } else {
                        this.masterSession.sessionCards.push(sessions[i].sessionCards[j]);
                    }
                }
                this.masterSession.description += ", " + sessions[i].description; 
            }
            console.log('Aantal kaarten: ' + this.masterSession.sessionCards.length);
            if (this.masterSession.sessionCards.length > 0) {
                this.sessionMasterHidden = false;
            } else {
                this.sessionEmptyHidden = false;
            } 
        } catch (TypeError) {
            console.log("There are no sessions or no cards: " + Error);
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
        for (var i : number = 0; i < deck.length; i++) {
            if (card == deck[i]) {
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
        /*var cards: Array<Card> = this.modelSession.sessionCards;
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
        }*/
    }

    public resetAnalysis() {
        /*this.sessionsToAnalyse = new Array<Session>();
        this.sessionEmptyHidden = true;
        this.sessionMasterHidden = true;

        this._sessionService.getSessionsByUser()
            .subscribe(
            data => this.allSessions = new SessionJsonMapper().sessionsFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete: number of sessions ' + this.allSessions.length)
        );
        this.selectedSessions = new Array<Session>();*/
    }
} 