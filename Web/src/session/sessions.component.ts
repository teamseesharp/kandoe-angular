import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session} from './model/session';
import {SessionType} from './model/session';

import {SessionTypePipe} from './session-type.pipe';
import {DatePipe} from 'angular2/common';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/session/sessions.html',
    pipes: [SessionTypePipe]
})

export class SessionsComponent implements OnInit {

    public sessions: Array<Session>;
    public sessionDetail: Session;
    public types: Array<SessionType> = [SessionType.sync, SessionType.async];
    public subthemes: Array<String> = ["Subthema1","Subthema2", "Subthema3"];
    public progress: string;
    public sessionDetailHidden: boolean;
    public sessionVerlopen: string;

    model = new Session("", SessionType.async, "", new Date(Date.now()), new Date(Date.now()));
    
    constructor(private _router: Router, private _routeParams: RouteParams) {
        var ses1 = new Session("test1.com", SessionType.sync, "beschrijving", new Date(2016, 0, 12), new Date(2016, 5, 17));
        var ses2 = new Session("test2.com", SessionType.sync, "minder goede beschrijving", new Date(2016, 1, 7), new Date(2016, 10, 27));
        var ses3 = new Session("test3.com", SessionType.async, "zeer goede beschrijving", new Date(2016, 1, 27), new Date(2016, 7, 8));
        var ses4 = new Session("test4.com", SessionType.async, "Een gewone beschrijving", new Date(2016, 1, 15), new Date(2016, 2, 9));
        ses1.id = 1;
        ses1.subtheme = "subthema 1";
        ses2.id = 2;
        ses2.subtheme = "subthema 2";
        ses3.id = 3;
        ses3.subtheme = "subthema 3";
        ses4.id = 4;
        ses4.subtheme = "subthema 4";
        this.sessions = [ses1, ses2, ses3, ses4];
        this.sessionDetail = new Session("", SessionType.sync, "", new Date(), new Date());
        this.progress = "width: 0%";
        this.sessionDetailHidden = true;

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

    private playOrAnalyseSession(session: Session) {
        if (this.sessionVerlopen === "Speel") {
            this._router.navigate(['Session', { id: session.id }]);
        } else {
            this._router.navigate(['Analysis', { id: session.id }]);
        }
    }

    private cloneSession(session: Session) {
    }

    private deleteSession(session: Session) {
        /*var tempsessions: Array<Session>;
        var counter = 0;
        for (var sessionvar in this.sessions) {
            if (counter != this.sessions.indexOf(session)) {
                tempsessions.push(sessionvar);
            }
            counter++;
        }
        this.sessions = tempsessions.reverse();*/
    }
}