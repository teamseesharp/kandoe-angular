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

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/session/sessions.html',
    pipes: [SessionTypePipe, SessionParticipantsPipe],
    providers: [SessionService, SubthemeService, CardService, OrganisationService]
})

export class SessionsComponent implements OnInit {

    public sessions: Array<Session> = [];
    public sessionDetail: Session = new Session();;
    public subthemes: Array<Subtheme> = [];
    public progress: string = "width: 0%";
    public sessionDetailHidden: boolean = true;
    private organisation: Organisation = new Organisation();
    private isParticipant: boolean = false;
    private selectionCards: Array<Card> = [];
    private playerCards: Array<Card> = [];
    private sessionModel = new Session();
    private cardModel = new Card();
    private openSessions: Array<Session> = [];
    private futureSessions: Array<Session> = [];
    private pastSessions: Array<Session> = [];
    private noOpenSession: boolean = false;
    private users: Array<string> = [];
    private organisationId: number = 0;

    constructor(private _router: Router, private _routeParams: RouteParams, private _sessionService: SessionService, private _cardService: CardService,
        private _subthemeService: SubthemeService, private _organisationService: OrganisationService) {
        if (tokenNotExpired()) {
            this.checkRouteParams();
        }
    }

    ngOnInit() {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
    }

    private getOrganisation() {
        this._organisationService.getOrganisationById(parseInt(this._routeParams.get('id')))
            .subscribe(
                data => this.organisation = new OrganisationJsonMapper().organisationFromJson(data.json()),
                err => console.log(err),
                () => console.log('Show organisation')
            );
    }

    private initializeSessionLists(data: any) {
        this.sessions = new SessionJsonMapper().sessionsFromJson(data.json());
        this.openSessions = this.sessions.filter(session => session.start.getTime() < Date.now() && session.end.getTime() > Date.now());
        this.futureSessions = this.sessions.filter(session => session.start.getTime() > Date.now());
        this.pastSessions = this.sessions.filter(session => session.end.getTime() < Date.now());
    }

    private checkRouteParams() {
        if (this._routeParams.get('id') == null) {
            this.noOpenSession = false;
            this._sessionService.getSessionsByUser()
                .subscribe(
                data => {
                    this.initializeSessionLists(data);
                    if (this.openSessions.length < 1) {
                        this.noOpenSession = true;
                    }
                },
                err => console.log(err),
                () => console.log('Complete')
                );
        } else {
            this.organisationId = parseInt(this._routeParams.get('id'));
            this.getOrganisation();
            this._sessionService.getSessionsByOrganisation(this.organisationId)
                .subscribe(
                data => {
                    this.initializeSessionLists(data);
                    if (this.openSessions.length < 1) {
                        this.noOpenSession = true;
                    }
                },
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

    private onSelect(session: Session) {
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
            () => console.log('Complete: sessionId: ' + session.id + 'is participant: ' + this.isParticipant)
            );
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

    private onClickChangeSession() {
        this.sessionModel = this.sessionDetail;
        (<HTMLInputElement>document.getElementById('subthemeSelect')).value = this.sessionDetail.subthemeId.toString();
    }

    private setSessionDetails() {
        var session: Session = new Session();
        session = this.sessionModel;

        // workaround for select input field not updating model
        session.subthemeId = parseInt((<HTMLInputElement>document.getElementById('subthemeSelect')).value);

        //session.description = this.subthemes.filter(subtheme => subtheme.id == session.subthemeId)[0].name;
        if (this.organisationId != 0) session.organisationId = this.organisationId;
        session.start = new Date(Date.parse(this.sessionModel.start.toString()));
        session.end = new Date(Date.parse(this.sessionModel.end.toString()));
        session.currentPlayerIndex = 0;
        session.isFinished = false;
        session.round = 0;

        // workaround for tags not binding to model
        var userList = document.getElementsByClassName("tag");

        this.users = [];
        for (var i = 0; i < userList.length; i++) {
            var temp = userList[i].firstChild.textContent.replace(" ", "");
            this.users.push(temp);
        }
        return session;
    }

    private createSession() {
        var sessionToCreate = this.setSessionDetails();
        this._sessionService.postSession(sessionToCreate)
            .subscribe(
            data => {
                var session = new SessionJsonMapper().sessionFromJson(data.json());
                this.initializeSessionLists(data);
                this._sessionService.patchSessionInvites(session.id, this.users)
                    .subscribe(
                    err => console.log(err),
                    () => console.log('User patch complete')
                    );
            },
            err => console.log(err),
            () => console.log('Session created ' + sessionToCreate.description)
            );
        this.sessionModel = new Session();
    }

    private changeSession() {
        var sessionToChange = this.setSessionDetails();
        this._sessionService.putSession(sessionToChange).subscribe();
        this._sessionService.patchSessionInvites(sessionToChange.id, this.users)
            .subscribe(
            err => console.log(err),
            () => console.log('User patch complete')
        );
        this.sessionModel = new Session();
    }

    private cloneSession() {
        var sessionToClone = new Session();
        sessionToClone = this.sessionModel;

        // workaround for select input field not updating model
        sessionToClone.subthemeId = parseInt((<HTMLInputElement>document.getElementById('subthemeSelect')).value);

        //sessionToClone.description = this.subthemes.filter(subtheme => subtheme.id == sessionToClone.subthemeId)[0].name;
        sessionToClone.start = new Date(Date.parse(this.sessionModel.start.toString()));
        sessionToClone.end = new Date(Date.parse(this.sessionModel.end.toString()));
        sessionToClone.currentPlayerIndex = 0;
        sessionToClone.isFinished = false;
        sessionToClone.participants = [];
        this._sessionService.postSession(sessionToClone)
            .subscribe(
            data => this.sessions.push(new SessionJsonMapper().sessionFromJson(data.json())),
            err => console.log(err),
            () => console.log('Session created ' + sessionToClone.description)
        );
        this.sessionModel = new Session();
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

    private addCardToSelection(card: Card) {
        if (this.playerCards.length < this.sessionDetail.maxCardsToChoose && !this.playerCards.some(c => c.text == card.text)) {
            var index = this.selectionCards.indexOf(card);
            this.selectionCards.splice(index, 1);
            this.playerCards.push(card);
        }
    }

    private removeCardFromSelection(card: Card) {
        var index = this.playerCards.indexOf(card);
        this.playerCards.splice(index, 1);
        this.selectionCards.push(card);
    }

    private submitCards() {
        this._sessionService.patchSessionCards(this.playerCards, this.sessionDetail.id)
            .subscribe(
            err => console.log(err),
            () => console.log('Complete')
        );
        this._sessionService.patchSessionJoin(this.sessionDetail.id)
            .subscribe(
            err => console.log(err),
            () => console.log('Complete')
        );
        this._router.navigate(['Session', { id: this.sessionDetail.id }]);
    }
}