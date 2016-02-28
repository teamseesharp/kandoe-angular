import {Component, View} from 'angular2/core';
import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';
import {Profile} from '../account/model/profile';

@Component({
})

@View({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'Views/account/Profile.html'
})

export class ProfielComponent {
    model = new Profile(1, "Bennie", "Helsen", "helsen.bennie@hotmail.be", "Test1234");

    submitted = false;

    onSubmit() { this.submitted = true; }

    get diagnostic() { return JSON.stringify(this.model); }
}