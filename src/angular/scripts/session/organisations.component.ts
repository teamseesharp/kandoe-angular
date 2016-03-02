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
        this.organisations = [
            new Organisation("KdG", "Thomas"),
            new Organisation("De Baldadige Bierbowlers", "Cas")
        ];
    }

    onSubmit() {
        this.submitted = true;
    }
}