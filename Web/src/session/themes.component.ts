import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Theme} from './model/theme';
import {Organisation} from './model/organisation';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'src/session/themes.html'
})

export class ThemesComponent {

    public themes: Array<Theme>;
    public organisations: Array<Organisation>;
    model = new Theme();

    constructor(private _router: Router) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        this.initializeThemes();
        this.initializeOrganisations();
    }

    initializeThemes() {
        var theme1 = new Theme();
        var theme2 = new Theme();
        theme1.description = "Welk café nemen we?";
        theme1.name = "Avondje uit";
        theme2.description = "Welke ondergrond kiezen we, gravel of hard court?";
        theme2.name = "Nieuw tennisveld";
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

    onCreateTheme() {
        var organisationTags = document.getElementsByClassName("tag");
        // tags is nu 1 string (gescheiden door ,? idk fosho), geen array van strings
        /*this.model.tags = [];
        for (var i = 0; i < organisationTags.length; i++) {
            this.model.tags.push(organisationTags[i].firstChild.textContent);
        }*/

        this.themes.push(this.model);
        this.model = new Theme();
    }
}