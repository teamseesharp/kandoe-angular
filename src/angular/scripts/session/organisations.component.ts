import {Component, View} from 'angular2/core';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Organisation} from './model/organisation';
import {Router, RouteParams, RouterLink} from 'angular2/router';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'Views/session/Organisations.html'
})

export class OrganisationsComponent {

    public organisations: Array<Organisation>;
    model = new Organisation("", "");
    
    constructor(private _router: Router) {
        var org1 = new Organisation("KdG", "Marvin");
        var org2 = new Organisation("De Baldadige Bierbowlers", "Louise");
        var org3 = new Organisation("FC De Kampioenen", "Jolyn");
        var org4 = new Organisation("De postduif", "Luc");

        org1.id = 1;
        org2.id = 2;
        org3.id = 3;
        org4.id = 4;
        this.organisations = [org1, org2, org3, org4];
    }

    onSubmit() {
        this.organisations.push(this.model);
        this.model = new Organisation("", "");
    }

    onEdit(organisation: Organisation) {
        this._router.navigate(['Organisation', { id: organisation.id }]);
    }

    onClose() {
        alert('hello');
    }
}