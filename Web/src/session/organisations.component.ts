import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Organisation} from './model/organisation';
import {OrganisationService} from './organisation.service';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, ROUTER_DIRECTIVES],
    templateUrl: 'src/session/organisations.html',
    providers: [OrganisationService]
})

export class OrganisationsComponent {

    public organisations: Array<Organisation> = [];
    model = new Organisation();
    
    constructor(private _router: Router, private _organisationService: OrganisationService) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        _organisationService.getOrganisationsByUser()
            .subscribe(
            data => this.organisations = _organisationService.organisationsFromJson(data.json()),
            err => console.log(err),
            () => console.log('Complete')
            );
    }

    onCreateOrganisation() {
        var organisation: Organisation = new Organisation();    
        organisation = this.model;
        organisation.organiserId = localStorage.getItem('user_id');
        this._organisationService.postOrganisation(organisation)
            .subscribe(
            data => this.organisations.push(this._organisationService.organisationFromJson(data.json())),
            err => console.log(err),
            () => console.log('Complete')
            );
        this.model = new Organisation();
    }

    onEdit(organisation: Organisation) {
        this._router.navigate(['Organisation', { id: organisation.id }]);
    }
}