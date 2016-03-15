import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {HeadingComponent} from '../defaultcomponents/heading.component';
import {BodyContentComponent} from '../defaultcomponents/body-content.component';
import {SidebarComponent} from '../defaultcomponents/sidebar.component';

import {Theme} from './model/theme';
import {Subtheme} from './model/subtheme';
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
    model = new Theme();
    subthemeModel = new Subtheme();

    constructor(private _router: Router, private _routeParams: RouteParams,
                private _themeService: ThemeService, private _subthemeService: SubthemeService) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        this.getThemesByOrganisation();
    }

    getThemesByOrganisation() {
        this._themeService.getThemesByOrganisation(parseInt(this._routeParams.get('id')))
            .subscribe(
            data => this.themes = this._themeService.themesFromJson(data.json()),
            err => console.log(err),
            () => console.log('Read all themes')
            );
    }

    onCreateTheme() {
        var theme: Theme = new Theme();
        theme = this.model;
        theme.organiserId = localStorage.getItem('user_id');
        theme.organisationId = parseInt(this._routeParams.get('id'));

        var themeTags = document.getElementsByClassName("tag");
        this.model.tags = "";
        // concatenate all input tags to one string
        for (var i = 0; i < themeTags.length; i++) {
            this.model.tags += themeTags[i].firstChild.textContent + ";";
        }

        this._themeService.postTheme(theme)
            .subscribe(
            data => this.themes.push(this._themeService.themeFromJson(data.json())),
            err => console.log(err),
            () => console.log('Theme created')
            );

        this.model.tags = "";
        this.model = new Theme();
    }

    onAddSubtheme() {
        var subtheme: Subtheme = new Subtheme();
        subtheme = this.subthemeModel;
        subtheme.organiserId = localStorage.getItem('user_id');

        this._subthemeService.postSubtheme(subtheme)
            .subscribe(
            data => subtheme = this._subthemeService.subthemeFromJson(data.json()),
            err => console.log(err),
            () => console.log('Subtheme added')
            );

        this.subthemeModel = new Subtheme();
        console.log(JSON.stringify(subtheme));
        this.getThemesByOrganisation();
    }

    // When opening the modal to add a subtheme, this method will fill in the right themeId in the subthemeModel
    openSubthemeModal(themeId: number) {
        this.subthemeModel.themeId = themeId;
        console.log('id set: ' + this.subthemeModel.themeId);
    }
}