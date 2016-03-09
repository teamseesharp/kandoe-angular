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
    model = new Theme(3, "TI contactavond", "Wat zijn de belangrijkste competenties voor pas afgestudeerde informatici",
        new Array("tag1", "tag2", "tag3"));
    submitted = false;
    
    constructor(private _router: Router) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }

        this.themes = [
            new Theme(1, "Avondje uit", "Welk café nemen we?", new Array("drinken", "gezelligheid", "bier")),
            new Theme(2, "Nieuw tennisveld", "Welke ondergrond kiezen we, gravel of hard court?", new Array("tennisveld", "gravel", "hard court"))
        ];
        this.organisations = [
            new Organisation("KdG", "Bennie"),
            new Organisation("De kampioenen", "Olivier")
        ];
    }

    onSubmit() {
        this.submitted = true;
    }
}