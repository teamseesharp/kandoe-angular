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

import {SubthemeJsonMapper, SessionJsonMapper} from '../utility/json-mapper';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/session/analysis.html',
    pipes: [SessionTypePipe, SessionParticipantsPipe],
    providers: [SessionService, SubthemeService]
})

export class AnalysisComponent {
    private cardToMerge: Card = new Card();
    subthemes: Array<Subtheme>;
    sessions: Array<Session>;
    modelSubtheme: Subtheme;
    modelSession: Session;
    sessionToShow: Session = new Session();
    public sessionMasterHidden: boolean;

    sessionsToAnalyse: Array<Session>;

    constructor(private _router: Router, private _routeParams: RouteParams, private _subthemeService: SubthemeService, private _sessionService: SessionService) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        this.sessionMasterHidden = true;

        _subthemeService.getSubthemesByOrganiser(this._routeParams.get('id'))
            .subscribe(
            data => this.subthemes = new SubthemeJsonMapper().subthemesFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete: number of subthemes ' + this.subthemes.length)
        );
        _sessionService.getSessionsByUser()
            .subscribe(
            data => this.sessions = new SessionJsonMapper().sessionsFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete: number of sessions ' + this.sessions.length)
        );

        this.sessionsToAnalyse = new Array<Session>();
    }

    //onsubmit all sessions from subtheme
    onSubmitSubtheme() {
        this.modelSubtheme.id = parseInt((<HTMLInputElement>document.getElementById('subthemeSelect')).value);
        this._sessionService.getSessionsBySubtheme(this.modelSubtheme.id)
            .subscribe(
            data => {
                this.sessionsToAnalyse = new SessionJsonMapper().sessionsFromJson(data.json()),
                    console.log('NUMBER OF SESSIONS: ' + this.sessionsToAnalyse.length);
                console.log('NUMBER OF CARDS: ' + this.sessionsToAnalyse[0].sessionCards.length);
                    this.sessionToShow = this.masterCircle(this.sessionsToAnalyse);
            },
            err => console.log(err),
            () => console.log('Complete: get sessions to analyse ')
        );
    }

    //onOthersubmit all session from selected sessions
    onSubmitSession() {
        //Some magic
        //http://stackoverflow.com/questions/20305489/select-multiple-objects-and-save-to-ng-model
        //http://jsfiddle.net/EsQsW/2/
        //this.masterCircle(this.sessionsToAnalyse);
    }

    private masterCircle(sessions: Array<Session>): Session {
        //controle of er wel sessions zijn en of er kaarten zijn..
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
        this.sessionMasterHidden = false;
        console.log('MASTER: ' + master.id);
        console.log('MASTER: ' + master.description);
        console.log('MASTER: ' + master.sessionCards[0].sessionLevel);


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

    public addSession() {
        if (this.sessions.length > 0) {

            var sessionToAdd: Session = new Session();
            sessionToAdd = this.getSessionFromId(parseInt((<HTMLInputElement>document.getElementById('addSession')).value));

            this.sessionsToAnalyse.push(sessionToAdd);
            this.sessions.splice(this.sessions.indexOf(sessionToAdd), 1);
        }
    }

    public removeSession() {
        if (this.sessionsToAnalyse.length > 0) {
            var sessionToRemove: Session = new Session();
            sessionToRemove = this.getSessionFromId(parseInt((<HTMLInputElement>document.getElementById('removeSession')).value));

            this.sessions.push(sessionToRemove);
            this.sessionsToAnalyse.splice(this.sessions.indexOf(sessionToRemove), 1);
        }
    }

    private getSessionFromId(id: number): Session {
        for (var i: number = 0; i < this.sessions.length; i++) {
            if (this.sessions[i].id == id) {
                return this.sessions[i];
            }
        }

        for (var i: number = 0; i < this.sessionsToAnalyse.length; i++) {
            if (this.sessionsToAnalyse[i].id == id) {
                return this.sessionsToAnalyse[i];
            }
        }
    }
} 