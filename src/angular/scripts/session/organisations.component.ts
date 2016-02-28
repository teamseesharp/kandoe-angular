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
    model = new Organisation(5, "Joske");
    submitted = false;
    
    constructor() {
        this.organisations = [
            new Organisation(1, "KdG"),
            new Organisation(2, "De Baldadige Bierbowlers")
        ];
    }

    onSubmit() {
        this.submitted = true;
    }
}