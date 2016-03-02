import {Component} from 'angular2/core';

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
    model = new Session("", SessionType.async, "", new Date(Date.now()), new Date(Date.now()));
    
    constructor(private _router: Router, private _routeParams: RouteParams) {
        var ses1 = new Session("sessionlink.com", SessionType.sync, "beschrijving", new Date(Date.now()), new Date(Date.now()));
        var ses2 = new Session("sessionlink.com", SessionType.sync, "minder goede beschrijving", new Date(Date.now()), new Date(Date.now()));
        var ses3 = new Session("sessionlink.com", SessionType.async, "zeer goede beschrijving", new Date(Date.now()), new Date(Date.now()));
        ses1.id = 1;
        ses2.id = 2;
        ses3.id = 3;
        this.sessions = [ses1, ses2, ses3];
        this.sessionDetail = new Session("www.myurl.be", SessionType.sync, "test", new Date(Date.now()), new Date(Date.now()));
    }

    onSelect(session: Session) {
        this.sessionDetail = session;
        //this._router.navigate(['Sessions', { id: session.id }]);
    }
    
}