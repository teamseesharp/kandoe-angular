﻿import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session, SessionType} from './model/session';
import {Subtheme} from './model/subtheme';
import {SessionService} from './session.service';
import {SubthemeService} from './subtheme.service';

import {SessionTypePipe} from './session-type.pipe';
import {DatePipe} from 'angular2/common';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/session/sessions.html',
    pipes: [SessionTypePipe],
    providers: [SessionService, SubthemeService]
})

export class SessionsComponent implements OnInit {

    public sessions: Array<Session> = [];
    public sessionDetail: Session;
    public types: Array<SessionType> = [SessionType.sync, SessionType.async];
    public subthemes: Array<Subtheme> = [];
    public progress: string;
    public sessionDetailHidden: boolean;
    public sessionVerlopen: string;

    model = new Session();
    
    constructor(private _router: Router, private _routeParams: RouteParams, private _sessionService: SessionService, private _subthemeService: SubthemeService) {
        this.sessionDetail = new Session();
        this.progress = "width: 0%";
        this.sessionDetailHidden = true;
        this._sessionService.getSessionsByUser()
            .subscribe(
            data => this.sessions = this._sessionService.sessionsFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete')
        );
        this._subthemeService.getSubthemesByOrganiser(localStorage.getItem('user_id'))
            .subscribe(
            data => this.subthemes = this._subthemeService.subthemesFromJson(data.json()),
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
        if (session.end < new Date()) {
            this.sessionVerlopen = "Analyse";
        } else {
            this.sessionVerlopen = "Speel";
        }
    }

    onSubmit() {
        var sessionToAdd: Session = new Session();
        sessionToAdd = this.model;
        console.log('subthemeid: ' + this.model.subthemeId);
        sessionToAdd.organisationId = parseInt(localStorage.getItem('user_id'));
        sessionToAdd.start = new Date(Date.parse(this.model.start.toString()));
        sessionToAdd.end = new Date(Date.parse(this.model.end.toString()));
        this._sessionService.postSession(sessionToAdd)
            .subscribe(
            data => this.sessions.push(this._sessionService.sessionFromJson(data.json())),
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

    private playOrAnalyseSession(session: Session) {
        if (this.sessionVerlopen == "Speel") {
            this._router.navigate(['Session', { id: session.id }]);
        } else {
            this._router.navigate(['Analysis', { id: session.id }]);
        }
    }

    private cloneSession(session: Session) {
    }
}