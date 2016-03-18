import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session} from '../session/model/session';
import {SessionService} from '../session/session.service';
import {CardService} from '../session/card.service';

import {SessionJsonMapper} from '../utility/json-mapper';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/home/home.html',
    providers: [SessionService, CardService]
})    

export class HomeComponent {
    private sessions: Array<Session>;
    private openSessions: Array<Session>;
    private futureSessions: Array<Session>;
    private pastSessions: Array<Session>;
    
    constructor(private _router: Router, private _sessionService: SessionService) {

        if (!tokenNotExpired()) { this._router.navigate(['Login']); }

        _sessionService.getSessionsByUser()
            .subscribe(
            data => {
                this.sessions = new SessionJsonMapper().sessionsFromJson(data.json());
                this.openSessions = this.sessions.filter(session => session.start.getTime() < Date.now() && session.end.getTime() > Date.now());
                this.futureSessions = this.sessions.filter(session => session.start.getTime() > Date.now());
                this.pastSessions = this.sessions.filter(session => session.end.getTime() < Date.now());
            },
            err => console.log(err),
            () => console.log('Complete')
        );
    }

    onSelect(sessionToOpen: Session) {
        this._router.navigate(['Session', { id: sessionToOpen.id }]);
    }

    onSelectClosedSession(sessionToOpen: Session) {
        this._router.navigate(['Snapshot', { id: sessionToOpen.id }]);
    }
}