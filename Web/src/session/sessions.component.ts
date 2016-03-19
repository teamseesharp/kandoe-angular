import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session, SessionType} from './model/session';
import {Subtheme} from './model/subtheme';
import {Organisation} from './model/organisation';
import {Card} from './model/card';

import {SessionService} from './session.service';
import {SubthemeService} from './subtheme.service';
import {CardService} from './card.service';
import {OrganisationService} from './organisation.service';

import {SessionTypePipe} from './session-type.pipe';
import {SessionParticipantsPipe} from './session-participants.pipe';
import {DatePipe} from 'angular2/common';

import {SubthemeJsonMapper, SessionJsonMapper, OrganisationJsonMapper, CardJsonMapper} from '../utility/json-mapper';

export enum Action {
    create,
    modify,
    clone
}

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/session/sessions.html',
    pipes: [SessionTypePipe, SessionParticipantsPipe],
    providers: [SessionService, SubthemeService, CardService, OrganisationService]
})

export class SessionsComponent implements OnInit {

    public sessions: Array<Session> = [];
    public sessionDetail: Session;
    public types: Array<SessionType> = [SessionType.sync, SessionType.async];
    public subthemes: Array<Subtheme> = [];
    public progress: string;
    public sessionDetailHidden: boolean;
    private action: Action;
    private organisation: Organisation;
    private isParticipant: boolean = false;
    private selectionCards: Array<Card> = [];
    private playerCards: Array<Card> = [];
    private sessionModel = new Session();
    private cardModel = new Card();


    constructor(private _router: Router, private _routeParams: RouteParams, private _sessionService: SessionService, private _cardService: CardService,
        private _subthemeService: SubthemeService, private _organisationService: OrganisationService) {
        this.getOrganisation();
        this.sessionDetail = new Session();
        this.progress = "width: 0%";
        this.sessionDetailHidden = true;
        this.action = Action.create;
        this.checkRouteParams();
    }

    private getOrganisation() {
        this._organisationService.getOrganisationById(parseInt(this._routeParams.get('id')))
            .subscribe(
            data => this.organisation = new OrganisationJsonMapper().organisationFromJson(data.json()),
            err => console.log(err),
            () => console.log('Show organisation')
            );
    }

    private checkRouteParams() {
        if (this._routeParams.get('id') == null) {
            this._sessionService.getSessionsByUser()
                .subscribe(
                data => this.sessions = new SessionJsonMapper().sessionsFromJson(data.json()),
                err => console.log(err),
                () => console.log('Complete')
                );
        } else {
            this._sessionService.getSessionsByOrganisation(parseInt(this._routeParams.get('id')))
                .subscribe(
                data => this.sessions = new SessionJsonMapper().sessionsFromJson(data.json()),
                err => console.log(err),
                () => console.log('Complete')
                );
        }
        this._subthemeService.getSubthemesByOrganiser(localStorage.getItem('user_id'))
            .subscribe(
            data => {
                this.subthemes = new SubthemeJsonMapper().subthemesFromJson(data.json());
            },
            err => console.log(err),
            () => console.log('Complete')
            );
    }

    ngOnInit() {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
    }

    onSelect(session: Session) {
        this.isParticipant = false;
        this.sessionDetail = session;
        if (this.sessionDetail.participants.filter(acc => acc.id == parseInt(localStorage.getItem('user_id'))).length > 0)
            this.isParticipant = true;
        this.calculateProgress();
        this.sessionDetailHidden = false;
        this._cardService.getCardsBySubtheme(this.sessionDetail.subthemeId)
            .subscribe(
            data => this.selectionCards = new CardJsonMapper().cardsFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete')
            );
    }

    onCreateSession() {
        var sessionToUse: Session = new Session();
        sessionToUse = this.sessionModel;
        sessionToUse.subthemeId = parseInt((<HTMLInputElement>document.getElementById('subthemeSelect')).value);
        sessionToUse.description = this.subthemes.filter(subtheme => subtheme.id == sessionToUse.subthemeId)[0].name;
        sessionToUse.organisationId = parseInt(localStorage.getItem('user_id'));
        sessionToUse.start = new Date(Date.parse(this.sessionModel.start.toString()));
        sessionToUse.end = new Date(Date.parse(this.sessionModel.end.toString()));
        sessionToUse.currentPlayerIndex = 0;
        sessionToUse.isFinished = false;

        switch (this.action) {
            case Action.create:
                this._sessionService.postSession(sessionToUse)
                    .subscribe(
                    data => this.sessions.push(new SessionJsonMapper().sessionFromJson(data.json())),
                    err => console.log(err),
                    () => console.log('Session created ' + sessionToUse.description)
                    );
                break;
            case Action.clone:
                this._sessionService.postSession(sessionToUse)
                    .subscribe(
                    data => this.sessions.push(new SessionJsonMapper().sessionFromJson(data.json())),
                    err => console.log(err),
                    () => console.log('Session cloned ' + sessionToUse.description)
                    );
                break;
            case Action.modify:
                this._sessionService.putSession(sessionToUse)
                    .subscribe(
                    data => this.sessions.push(new SessionJsonMapper().sessionFromJson(data.json())),
                    err => console.log(err),
                    () => console.log('Session modified ' + sessionToUse.description)
                    );
                break;
            default: console.log('Wrong action');
        }
        this.sessionModel = new Session();
    }

    private calculateProgress() {
        var startDateInMs = this.sessionDetail.start.getTime();
        var endDateInMs = this.sessionDetail.end.getTime();
        var currentDateInMs = new Date(Date.now()).getTime();
        var result = (currentDateInMs - startDateInMs) / (endDateInMs - startDateInMs) * 100;
        if (result > 100) result = 100;
        if (result < 0) result = 0;
        this.progress = "width: " + result + "%";
    }

    private analyseSession(session: Session) {
        this._router.navigate(['Analysis', { id: session.id }]);
    }

    private playSession(session: Session) {
        this._router.navigate(['Session', { id: session.id }]);
    }

    private cloneSession(sessionToClone: Session) {
        this.sessionModel = sessionToClone;
        console.log("subthemeId: " + this.sessionModel.subthemeId);
        this.action = Action.clone;
    }

    private changeSession(sessionToChange: Session) {
        this.sessionModel = sessionToChange;
        this.action = Action.modify;
    }

    private createSession() {
        this.action = Action.create;
    }

    private addCardToSubtheme() {
        var card = new Card();
        card.image = "image";
        card.text = this.cardModel.text;
        card.subthemeId = this.sessionDetail.subthemeId;
        card.themeId = this.selectionCards[0].themeId;
        this._cardService.postCard(card)
            .subscribe(
            data => this.selectionCards.push(new CardJsonMapper().cardFromJson(data.json())),
            err => console.log(err),
            () => console.log('Complete')
            );
        this.cardModel = new Card();
    }

    addCardToSelection(card: Card) {
        if (this.playerCards.length < this.sessionDetail.maxCardsToChoose && !this.playerCards.some(c => c.text == card.text)) {
            var index = this.selectionCards.indexOf(card);
            this.selectionCards.splice(index, 1);
            this.playerCards.push(card);
        }
    }

    removeCardFromSelection(card: Card) {
        var index = this.playerCards.indexOf(card);
        this.playerCards.splice(index, 1);
        this.selectionCards.push(card);
    }

    submitCards() {
        this._sessionService.patchSessionCards(this.playerCards, this.sessionDetail.id)
            .subscribe(
            err => console.log(err),
            () => console.log('Complete')
            );
    }
}