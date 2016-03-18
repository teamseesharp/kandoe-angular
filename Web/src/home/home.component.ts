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
    openSessions: Array<Session>;
    futureSessions: Array<Session>;
    pastSessions: Array<Session>;
    
    constructor(private _router: Router, private _sessionService: SessionService) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        _sessionService.getOpenedSessionsByUser()
            .subscribe(
            data => this.openSessions = new SessionJsonMapper().sessionsFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete')
        );
        _sessionService.getFutureSessionsByUser()
            .subscribe(
            data => this.futureSessions = new SessionJsonMapper().sessionsFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete')
        );
        _sessionService.getClosedSessionsByUser()
            .subscribe(
            data => this.pastSessions = new SessionJsonMapper().sessionsFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete')
        );
    }

    onSelect(sessionToOpen: Session) {
        this._router.navigate(['Session', { id: sessionToOpen.id }]);
    }
}