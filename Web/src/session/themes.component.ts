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
import {OrganisationService} from './organisation.service';

import {ThemeJsonMapper, SubthemeJsonMapper, OrganisationJsonMapper} from '../utility/json-mapper';

@Component({
    directives: [HeadingComponent, BodyContentComponent, SidebarComponent, ROUTER_DIRECTIVES],
    templateUrl: 'src/session/themes.html',
    providers: [ThemeService, SubthemeService, OrganisationService]
})

export class ThemesComponent {

    public themes: Array<Theme>;
    private organisation: Organisation;
    model = new Theme();
    subthemeModel = new Subtheme();

    constructor(private _router: Router, private _routeParams: RouteParams,
        private _themeService: ThemeService, private _subthemeService: SubthemeService, private _organisationService: OrganisationService) {
        if (!tokenNotExpired()) { this._router.navigate(['Login']); }
        this.getThemesByOrganisation();
        this.getOrganisation();
    }

    private getThemesByOrganisation() {
        this._themeService.getThemesByOrganisation(parseInt(this._routeParams.get('id')))
            .subscribe(
            data => this.themes = new ThemeJsonMapper().themesFromJson(data.json()),
            err => console.log(err),
            () => console.log('Read all themes')
            );
    }

    private getOrganisation() {
        this._organisationService.getOrganisationById(parseInt(this._routeParams.get('id')))
            .subscribe(
            data => this.organisation = new OrganisationJsonMapper().organisationFromJson(data.json()),
            err => console.log(err),
            () => console.log('Show organisation') 
            );
    }

    onCreateTheme() {
        var theme: Theme = new Theme();
        theme = this.model;

        var themeTags = document.getElementsByClassName("tag");
        theme.tags = "";
        // concatenate all input tags to one string
        for (var i = 0; i < themeTags.length; i++) {
            theme.tags += themeTags[i].firstChild.textContent + ";";
        }

        this._themeService.postTheme(theme)
            .subscribe(
            data => this.themes.push(new ThemeJsonMapper().themeFromJson(data.json())),
            err => console.log(err),
            () => console.log('Theme created')
            );

        this.model.tags = "";
        this.model = new Theme();
    }

    onAddSubtheme() {
        var subtheme: Subtheme = new Subtheme();
        subtheme = this.subthemeModel;

        this._subthemeService.postSubtheme(subtheme)
            .subscribe(
            data => {
                subtheme = new SubthemeJsonMapper().subthemeFromJson(data.json());
                this.getThemesByOrganisation();
            },
            err => console.log(err),
            () => console.log('Subtheme added')
            );

        this.subthemeModel = new Subtheme();
    }

    onEditTheme() {
        var theme: Theme = new Theme();
        theme = this.model;

        /*var themeTags = document.getElementsByClassName("tag");
        this.model.tags = "";
        // concatenate all input tags to one string
        for (var i = 0; i < themeTags.length; i++) {
            this.model.tags += themeTags[i].firstChild.textContent + ";";
        }*/

        this._themeService.updateTheme(theme)
            .subscribe(
            data => { this.getThemesByOrganisation(); },
            err => console.log(err),
            () => console.log('Theme edited')
            );

        this.model.tags = "";
        this.model = new Theme();
    }

    onEditSubtheme() {
        var subtheme: Subtheme = new Subtheme();
        subtheme = this.subthemeModel;

        this._subthemeService.updateTheme(subtheme)
            .subscribe(
            data => { this.getThemesByOrganisation(); },
            err => console.log(err),
            () => console.log('Subtheme edited')
            );
    }

    /* When opening the modal the next methods will fill in the right information in the subthemeModel or model */

    onOpenCreateModal() {
        this.model = new Theme();
        this.model.organiserId = localStorage.getItem('user_id');
        this.model.organisationId = parseInt(this._routeParams.get('id'));
    }

    onOpenSubthemeModal(themeId: number) {
        this.subthemeModel = new Subtheme();
        this.subthemeModel.themeId = themeId;
        this.subthemeModel.organiserId = localStorage.getItem('user_id');
    }

    onOpenEditThemeModal(theme: Theme) {
        this.model = theme;
        //this.model.tags = theme.tags.replace(';', ',');
    }

    onOpenEditSubthemeModal(subtheme: Subtheme) {
        this.subthemeModel = subtheme;
    }
}