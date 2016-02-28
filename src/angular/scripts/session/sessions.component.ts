import {Component, View} from 'angular2/core';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session} from './model/session';
import {SessionType} from './model/session';

@Component({
})

@View({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'Views/session/Sessions.html'
})

export class SessionsComponent {

    public sessions: Array<Session>;

    constructor() {
        this.sessions = [
            new Session(3, "sessie 1", SessionType.sync, new Date(Date.now()), new Date(Date.now())),
            new Session(7, "sessie 4", SessionType.async, new Date(Date.now()), new Date(Date.now())),
            new Session(9, "sessie 7", SessionType.sync, new Date(Date.now()), new Date(Date.now()))
        ];
    }

}