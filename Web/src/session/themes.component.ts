import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Theme} from './model/theme';
import {Organisation} from './model/organisation';
import {ThemeService} from './theme.service';
import {SubthemeService} from './subtheme.service';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, ROUTER_DIRECTIVES],
    templateUrl: 'src/session/themes.html',
    providers: [ThemeService, SubthemeService]
})

export class ThemesComponent {

    public themes: Array<Theme>;
    public organisations: Array<Organisation>;
    model = new Theme();

    constructor(private _router: Router, private _routeParams: RouteParams, private _themeService: ThemeService) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        _themeService.getThemesByOrganisation(parseInt(this._routeParams.get('id')))
            .subscribe(
                data => this.themes = _themeService.themeFromJson(data.json()),
                err => console.log(err),
                () => console.log('Complete theme')
            );
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