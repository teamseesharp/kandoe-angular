import {Component, View, OnInit} from 'angular2/core';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session} from './model/session';
import {SessionType} from './model/session';

import {Router, RouteParams, RouterLink} from 'angular2/router';

@Component({
})
@View({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, RouterLink],
templateUrl: 'Views/session/Sessions.html'
})

export class SessionsComponent {

    public sessions: Array<Session>;
    public sessionDetail: Session;
    model = new Session("", SessionType.async, "", null, null);
    sessionTypes: Array<SessionType>;
    
    constructor(
        private _router: Router,
        private _routeParams: RouteParams) {
        this.sessions = [
            new Session("sessionlink.com", SessionType.sync, "Santa ", new Date(Date.now()), new Date(Date.now())),
            new Session("sessionlink.com", SessionType.async, "is ", new Date(Date.now()), new Date(Date.now())),
            new Session("sessionlink.com", SessionType.sync, "coming ", new Date(Date.now()), new Date(Date.now()))
        ];
        this.sessionDetail = new Session("www.myurl.be", SessionType.sync, "This is the descritpion from the session", new Date(Date.now()), new Date(Date.now()))
        this.sessionTypes = [
            SessionType.async, SessionType.sync];

    }

    ngOnInit() {
        let id = this._routeParams.get('id');
        //sessie ophalen aan de hand van de id
        this.sessionDetail = new Session("www.myurl2.be", SessionType.sync, "This is the descritpion from the session", new Date(Date.now()), new Date(Date.now()))

    }

    onSelect(session: Session) {
        this.sessionDetail = session;
        this._router.navigate(['Sessions', { id: session.id }]);
    }
    
}