import {Component} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Organisation} from './model/organisation';
import {OrganisationService} from './organisation.service';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, RouterLink],
    templateUrl: 'src/session/organisation.html',
    providers: [OrganisationService]
})

export class OrganisationComponent{
    organisation: Organisation = new Organisation;
    model = new Organisation();

    constructor(private _router: Router, private _routeParams: RouteParams, private _organisationService: OrganisationService) {

        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        _organisationService.getOrganisationById(parseInt(this._routeParams.get('id')))
            .subscribe(
            data => {
                this.organisation = _organisationService.organisationFromJson(data.json()),
                this.model = this.organisation;
            },
            err => console.log(err),
            () => console.log('Complete organisation')
            );

        
    }

    onEditOrganisation() {
        this._organisationService.putOrganisation(this.model)
            .subscribe(
            data => {     
            },
            err => console.log(err),
            () => console.log('Complete organisation change')
            );
    }
}