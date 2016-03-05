﻿import {Component} from 'angular2/core';
import {DatePipe} from 'angular2/common';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session} from './model/session';
import {SessionType} from './model/session';
import {SessionTypePipe} from './session-type.pipe';

import {Router, RouteParams, RouterLink} from 'angular2/router';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'Views/session/Sessions.html',
    pipes:[SessionTypePipe]
})

export class SessionsComponent {

    public sessions: Array<Session>;
    public sessionDetail: Session;
    public types: Array<SessionType> = [SessionType.sync, SessionType.async];
    public progress: string;
    public sessionDetailHidden: boolean;

    model = new Session("", SessionType.async, "", new Date(Date.now()), new Date(Date.now()));
    
    constructor(private _router: Router, private _routeParams: RouteParams) {
        var ses1 = new Session("test1.com", SessionType.sync, "beschrijving", new Date(2016, 0, 12), new Date(2016, 5, 17));
        var ses2 = new Session("test2.com", SessionType.sync, "minder goede beschrijving", new Date(2016, 1, 7), new Date(2016, 10, 27));
        var ses3 = new Session("test3.com", SessionType.async, "zeer goede beschrijving", new Date(2016, 1, 27), new Date(2016, 7, 8));
        ses1.id = 1;
        ses2.id = 2;
        ses3.id = 3;
        this.sessions = [ses1, ses2, ses3];
        this.sessionDetail = new Session("", SessionType.sync, "", new Date(), new Date());
        this.progress = "width: 0%";
        this.sessionDetailHidden = true;
    }

    onSelect(session: Session) {
        this.sessionDetail = session;
        this.calculateProgress();
        this.sessionDetailHidden = false;
    }

    onSubmit() {
        this.model.link = "url/#/sessies/id"
        this.model.start = new Date(Date.parse(this.model.start.toString()));
        this.model.end = new Date(Date.parse(this.model.end.toString()));
        this.sessions.push(this.model);
        this.model = new Session("", SessionType.async, "", new Date(Date.now()), new Date(Date.now()));
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

    private playSession(session: Session) {
        this._router.navigate(['Session', { id: session.id }]);
    }
}