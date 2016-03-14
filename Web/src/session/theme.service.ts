import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Theme} from './model/theme';

@Injectable()
export class ThemeService {

    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');

    }

    public getThemesByOrganisation(organisationId: number) {
        var apiURL = 'http://kandoe-api.azurewebsites.net/api/verbose/themes/by-organisation/' + organisationId;
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public themeFromJson(data: any): Array<Theme> {
        var themes: Array<Theme> = [];
        for (var i = 0; i < data.length; i++) {
            var theme: Theme = new Theme();
            theme.id = data[i].Id;
            theme.name = data[i].Name;
            theme.description = data[i].Description;
            theme.organisationId = data[i].OrganisationId;
            theme.organiserId = data[i].OrganiserId;
            theme.tags = data[i].Tags;
            theme.selectionCards = data[i].SelectionCards;
            theme.subthemes = data[i].Subthemes;
            console.log(theme.subthemes[0]);
            themes.push(theme);
        }

        return themes;
    }
}
