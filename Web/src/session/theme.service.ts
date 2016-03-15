import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Theme} from './model/theme';
import {SubthemeService} from './subtheme.service';

@Injectable()
export class ThemeService {
    public apiPrefix: string = 'http://kandoe-api.azurewebsites.net/';
    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp, private _subthemeService: SubthemeService) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');
    }

    public getThemesByOrganisation(organisationId: number) {
        var apiURL = this.apiPrefix + 'api/verbose/themes/by-organisation/' + organisationId;
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public postTheme(theme: Theme) {
        var apiURL = this.apiPrefix + 'api/themes';
        return this.authHttp.post(apiURL, JSON.stringify(theme), { headers: this.header });
    }

    public updateTheme(theme: Theme) {
        var apiURL = this.apiPrefix + 'api/themes';
        return this.authHttp.put(apiURL, JSON.stringify(theme), { headers: this.header });
    }

    public themesFromJson(data: any): Array<Theme> {
        var themes: Array<Theme> = [];
        for (var i = 0; i < data.length; i++) {
            var theme: Theme = new Theme();
            theme.id = data[i].Id;
            theme.name = data[i].Name;
            theme.description = data[i].Description;
            theme.organisationId = data[i].OrganisationId;
            theme.organiserId = data[i].OrganiserId;
            theme.tags = data[i].Tags;
            theme.taags = theme.tags.split(';');
            theme.selectionCards = data[i].SelectionCards;
            theme.subthemes = this._subthemeService.subthemesFromJson(data[i].Subthemes);
            themes.push(theme);
        }

        return themes;
    }

    public themeFromJson(data: any): Theme {
        var theme: Theme = new Theme();
        theme.id = data.Id;
        theme.name = data.Name;
        theme.description = data.Description;
        theme.organisationId = data.OrganisationId
        theme.organiserId = data.OrganiserId;
        theme.tags = data.Tags;
        theme.taags = theme.tags.split(';');
        theme.selectionCards = data.SelectionCards;
        theme.subthemes = data.Subthemes;
        return theme;
    }
}
