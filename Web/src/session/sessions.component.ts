import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session, SessionType} from './model/session';
import {Subtheme} from './model/subtheme';
import {SessionService} from './session.service';
import {SubthemeService} from './subtheme.service';
import {CardService} from './card.service';

import {SessionTypePipe} from './session-type.pipe';
import {SessionParticipantsPipe} from './session-participants.pipe';
import {DatePipe} from 'angular2/common';

import {SubthemeJsonMapper, SessionJsonMapper} from '../utility/json-mapper';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/session/sessions.html',
    pipes: [SessionTypePipe, SessionParticipantsPipe],
    providers: [SessionService, SubthemeService, CardService]
})

export class SessionsComponent implements OnInit {

    public sessions: Array<Session> = [];
    public sessionDetail: Session;
    public types: Array<SessionType> = [SessionType.sync, SessionType.async];
    public subthemes: Array<Subtheme> = [];
    public progress: string;
    public sessionDetailHidden: boolean;
    public sessionExpired: boolean;

    model = new Session();
    
    constructor(private _router: Router, private _routeParams: RouteParams, private _sessionService: SessionService, private _subthemeService: SubthemeService) {
        this.sessionDetail = new Session();
        this.progress = "width: 0%";
        this.sessionDetailHidden = true;
        //controle van routeparams
        if (this._routeParams.get('id') == null) {
            console.log('ZONDER ID: ');
            this._sessionService.getSessionsByUser()
                .subscribe(
                data => this.sessions = new SessionJsonMapper().sessionsFromJson(data.json()),
                err => console.log(err),
                () => console.log('Complete')
                );
        } else {
<<<<<<< HEAD
            this._sessionService.getSessionsByOrganisation(parseInt(this._routeParams.get('id')))
=======
            console.log('MET ID: ' + this._routeParams.get('id'));
            this._sessionService.getSessionsByOrganisation(this._routeParams.get('id'))
>>>>>>> 9136bf17f4b37b83e065be1cff1676988bfe761f
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
        this.sessionDetail = session;
        this.calculateProgress();
        this.sessionDetailHidden = false;
        this.sessionExpired = false;
        if (session.end < new Date()) {
            this.sessionExpired = true;
        }
    }

    onSubmit() {
        var sessionToAdd: Session = new Session();
        sessionToAdd = this.model;
        sessionToAdd.subthemeId = parseInt((<HTMLInputElement>document.getElementById('subthemeSelect')).value);
        sessionToAdd.description = this.subthemes.filter(subtheme => subtheme.id == sessionToAdd.subthemeId)[0].name;
        sessionToAdd.organisationId = parseInt(localStorage.getItem('user_id'));
        sessionToAdd.start = new Date(Date.parse(this.model.start.toString()));
        sessionToAdd.end = new Date(Date.parse(this.model.end.toString()));
        sessionToAdd.currentPlayerIndex = 0;
        sessionToAdd.isFinished = false;
        //if (sessionToAdd.end < new Date()) sessionToAdd.isFinished = true;
        this._sessionService.postSession(sessionToAdd)
            .subscribe(
            data => this.sessions.push(new SessionJsonMapper().sessionFromJson(data.json())),
            err => console.log(err),
            () => console.log('Complete')
        );
        this.model = new Session();
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

    private cloneSession(session: Session) {
    }
}