import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Organisation} from './model/organisation';

@Injectable()
export class OrganisationService {

    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');

    }

    public getOrganisationsByUser() {
        var apiURL = 'http://kandoe-api.azurewebsites.net/api/organisations/by-organiser/' + localStorage.getItem('user_id');
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public organisationFromJson(data: any): Array<Organisation> {
        var organisations: Array<Organisation> = [];
        for (var i = 0; i < data.length; i++) {
            var organisation: Organisation = new Organisation();
            organisation.id = data[i].Id;
            organisation.name = data[i].Name;
            organisation.organiserId = data[i].OrganiserId;
            organisation.sessions = data[i].Sessions;
            organisation.themes = data[i].Themes;
            organisations.push(organisation);
        }

        return organisations;
    }
}
