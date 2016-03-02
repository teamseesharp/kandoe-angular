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
    templateUrl: 'Views/session/Session.html'
})

export class SessionComponent implements OnInit {

    session: Session;

    constructor(private _router: Router, private _routeParams: RouteParams) { }

    ngOnInit() {
        //vervangen door api call, get van session, id meegeven
        this.session = new Session("test.com", SessionType.sync, "", new Date(Date.now()), new Date(Date.now()));
        this.session.id = parseInt(this._routeParams.get('id'));
        //ff test
        if (this.session.id == 1) {
            this.session.description = "description1";
        }
        if (this.session.id == 2) {
            this.session.description = "description2";
        }
        if (this.session.id == 3) {
            this.session.description = "description3";
        }
    }

}