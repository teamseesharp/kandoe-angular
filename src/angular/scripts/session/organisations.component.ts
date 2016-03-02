import {Component, View} from 'angular2/core';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Organisation} from './model/organisation';

@Component({
})

@View({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'Views/session/Organisations.html'
})

export class OrganisationsComponent {

    public organisations: Array<Organisation>;
    model = new Organisation("", "");
    submitted = false;
    
    constructor() {
        var org1 = new Organisation("KdG", "");
        var org2 = new Organisation("De Baldadige Bierbowlers", "");
        org1.id = 1;
        org2.id = 2;
        this.organisations = [org1, org2];
    }

    onSubmit() {
        this.submitted = true;
    }
}