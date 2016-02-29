import {Component, View} from 'angular2/core';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Theme} from './model/theme';

@Component({
})

@View({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent],
    templateUrl: 'Views/session/Themes.html'
})

export class ThemesComponent {

    public themes: Array<Theme>;
    model = new Theme(3, "TI contactavond", "Wat zijn de belangrijkste competenties voor pas afgestudeerde informatici",
    "tag1, tag2, tag3");
    submitted = false;
    
    constructor() {
        this.themes = [
            new Theme(1, "Avondje uit", "Welk café nemen we?", "drinken, gezelligheid, bier"),
            new Theme(2, "Nieuw tennisveld", "Welke ondergrond kiezen we, gravel of hard court?", "tennisveld, gravel, hard court")
        ];
    }

    onSubmit() {
        this.submitted = true;
    }
}