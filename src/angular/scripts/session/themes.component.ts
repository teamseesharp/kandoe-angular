import {Component, View} from 'angular2/core';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Theme} from './model/theme';
import {Organisation} from './model/organisation';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'Views/session/Themes.html'
})

export class ThemesComponent {
    public themes: Array<Theme>;
    public organisations: Array<Organisation>;
    model = new Theme("", "", new Array());
    
    constructor() {
        this.themes = [
            new Theme("Avondje uit", "Welk café nemen we?", new Array("drinken", "gezelligheid", "bier")),
            new Theme("Nieuw tennisveld", "Welke ondergrond kiezen we, gravel of hard court?", new Array("tennisveld", "gravel", "hard court"))
        ];
        this.organisations = [
            new Organisation("KdG", "Bennie"),
            new Organisation("De kampioenen", "Olivier")
        ];
    }

    onSubmit() {
    }
}