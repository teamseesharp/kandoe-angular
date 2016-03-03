import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Organisation} from './model/organisation';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, RouterLink],
    templateUrl: 'Views/session/Organisation.html'
})

export class OrganisationComponent implements OnInit {
    organisation: Organisation;
    model = new Organisation("","");

    constructor(private _router: Router, private _routeParams: RouteParams) { }

    ngOnInit() {
        //vervangen door api call, get van session, id meegeven
        this.organisation = new Organisation("testorganisatie", "testeigenaar");
        this.organisation.id = parseInt(this._routeParams.get('id'));
        this.model = this.organisation;
    }

    onSubmit() {

    }
}