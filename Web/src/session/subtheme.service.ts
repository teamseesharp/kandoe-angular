import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Subtheme} from './model/subtheme';

@Injectable()
export class SubthemeService {

    public apiPrefix: string = 'http://localhost:51787/';
    //public apiPrefix: string = 'http://kandoe-api.azurewebsites.net/';
    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');
    }

    public getSubthemesByOrganiser(id: string) {
        var apiURL = this.apiPrefix + 'api/subthemes/by-organiser/' + id;
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public subthemeFromJson(data: any): Subtheme {
        var subtheme: Subtheme = new Subtheme();
        subtheme.id = data.Id;
        subtheme.name = data.Name;
        subtheme.organiserId = data.OrganiserId;
        subtheme.themeId = data.ThemeId;
        subtheme.selectionCards = data.SelectionCards;
        subtheme.sessions = data.Sessions;
        return subtheme;
    }

    public subthemesFromJson(data: any): Array<Subtheme> {
        var subthemes: Array<Subtheme> = [];
        for (var i = 0; i < data.length; i++) {
            var subtheme: Subtheme = new Subtheme();
            subtheme.id = data[i].Id;
            subtheme.name = data[i].Name;
            subtheme.organiserId = data[i].OrganiserId;
            subtheme.themeId = data[i].ThemeId;
            subtheme.selectionCards = data[i].SelectionCards;
            subtheme.sessions = data[i].Sessions;
            subthemes.push(subtheme);
            console.log('subtheme: ' + subtheme.name);
        }
        return subthemes;
    }
}