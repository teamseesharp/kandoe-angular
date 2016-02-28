import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {Session} from '../session/model/session';
import {SessionType} from '../session/model/session';
import {Organisation} from '../session/model/organisation';

@Component({
    selector: 'sidebar'
})
@View({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'Views/defaultcomponents/Sidebar.html'
})

export class SidebarComponent {

    public sessions: Array<Session>;
    public organisations: Array<Organisation>;

    constructor() {
        this.sessions = [
            new Session(3, "sessie 1", SessionType.sync, new Date(Date.now()), new Date(Date.now())),
            new Session(7, "sessie 4", SessionType.async, new Date(Date.now()), new Date(Date.now())),
            new Session(9, "sessie 7", SessionType.sync, new Date(Date.now()), new Date(Date.now()))
        ];
        this.organisations = [
            new Organisation(1, "KdG"),
            new Organisation(2, "De Baldadige Bierbowlers")
        ];
    }
}