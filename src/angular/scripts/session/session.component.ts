//import {Component, View, OnInit} from 'angular2/core';
import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Session} from './model/session';
import {SessionType} from './model/session';
import {SessionTypePipe} from './session-type.pipe';


@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, RouterLink],
    templateUrl: 'Views/session/Session.html',
    pipes: [SessionTypePipe]
})

export class SessionComponent implements OnInit {

    session: Session;

    constructor(private _router: Router, private _routeParams: RouteParams) { }

    ngOnInit() {
        //vervangen door api call, get van session, id meegeven
        this.session = new Session("test.com", SessionType.sync, "", new Date(Date.now()), new Date(Date.now()));
        this.session.id = parseInt(this._routeParams.get('id'));
    }
}