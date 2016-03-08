import {Component} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Organisation} from './model/organisation';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, RouterLink],
    templateUrl: 'src/session/organisation.html'
})

export class OrganisationComponent{
    organisation: Organisation;
    model = new Organisation("","");

    constructor(private _router: Router, private _routeParams: RouteParams) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }

        //vervangen door api call, get van session, id meegeven
        this.organisation = new Organisation("testorganisatie", "testeigenaar");
        this.organisation.id = parseInt(this._routeParams.get('id'));
        this.organisation.users = ["joske@hotmail.com", "jefke@hotmail.com"];
        this.model = this.organisation; }
        
}