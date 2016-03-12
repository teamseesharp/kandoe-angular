import {Component} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Organisation} from './model/organisation';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/session/organisations.html'
})

export class OrganisationsComponent {

    public organisations: Array<Organisation>;
    model = new Organisation();
    
    constructor(private _router: Router) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        this.initializeOrganisations();
    }

    initializeOrganisations() {
        var org1 = new Organisation();
        var org2 = new Organisation();
        var org3 = new Organisation();
        var org4 = new Organisation();

        org1.id = 1;
        org1.name = "KdG";
        org2.id = 2;
        org2.name = "De Baldadige Bierbowlers";
        org3.id = 3;
        org3.name = "FC De Kampioenen"
        org4.id = 4;
        org4.name = "De postduif"

        this.organisations = [org1, org2, org3, org4];
    }

    onCreateOrganisation() {
        var organisationTags = document.getElementsByClassName("tag");
        //this.model.users = [];
        for (var i = 0; i < organisationTags.length; i++) {
            //this.model.users.push(organisationTags[i].firstChild.textContent);
        }

        this.organisations.push(this.model);
        this.model = new Organisation();
    }

    onEdit(organisation: Organisation) {
        this._router.navigate(['Organisation', { id: organisation.id }]);
    }
}