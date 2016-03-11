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
    model = new Theme("", "");

    constructor(private _router: Router) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        this.themes = [
            new Theme("Avondje uit", "Welk café nemen we?"),
            new Theme("Nieuw tennisveld", "Welke ondergrond kiezen we, gravel of hard court?")
        ];
        this.themes[0].tags = ["drinken", "gezelligheid", "bier"];
        this.themes[1].tags = ["tennisveld", "gravel", "hard court"];
        this.organisations = [
            new Organisation("KdG", "Bennie"),
            new Organisation("De kampioenen", "Olivier")
        ];
    }

    onCreateTheme() {
        var organisationTags = document.getElementsByClassName("tag");
        this.model.tags = [];
        for (var i = 0; i < organisationTags.length; i++) {
            this.model.tags.push(organisationTags[i].firstChild.textContent);
        }

        this.themes.push(this.model);
        this.model = new Theme("", "");
    }
}