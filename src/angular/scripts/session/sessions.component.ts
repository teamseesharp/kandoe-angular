import {Component, View} from 'angular2/core';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session} from './model/session';
import {SessionType} from './model/session';

import {Router, RouteParams, RouterLink} from 'angular2/router';

@Component({
})
@View({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
templateUrl: 'Views/session/Sessions.html'
})

export class SessionsComponent {

    public sessions: Array<Session>;
    public sessionDetail: Session;
    model = new Session("", SessionType.async, "", new Date(Date.now()), new Date(Date.now()));
    sessionTypes: Array<SessionType>;
    
    constructor(private _router: Router, private _routeParams: RouteParams) {
        var ses1 = new Session("sessionlink.com", SessionType.sync, "beschrijving", new Date(Date.now()), new Date(Date.now()));
        var ses2 = new Session("sessionlink.com", SessionType.sync, "minder goede beschrijving", new Date(Date.now()), new Date(Date.now()));
        var ses3 = new Session("sessionlink.com", SessionType.async, "zeer goede beschrijving", new Date(Date.now()), new Date(Date.now()));
        ses1.id = 1;
        ses2.id = 2;
        ses3.id = 3;
        this.sessions = [ses1, ses2, ses3];
        this.sessionDetail = new Session("www.myurl.be", SessionType.sync, "test", new Date(Date.now()), new Date(Date.now()))
        this.sessionTypes = [SessionType.async, SessionType.sync];
    }
    /*
    ngOnInit() {
        let id = this._routeParams.get('id');
        //sessie ophalen aan de hand van de id
        this.sessionDetail = new Session("www.myurl2.be", SessionType.sync, "This is the descritpion from the session", new Date(Date.now()), new Date(Date.now()))

    }*/

    onSelect(session: Session) {
        this.sessionDetail = session;
        //alert(this.sessionDetail.description);
        //this._router.navigate(['Sessions', { id: session.id }]);
    }
    
}