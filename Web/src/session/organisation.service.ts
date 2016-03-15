import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Organisation} from './model/organisation';

@Injectable()
export class OrganisationService {
    public apiPrefix: string = 'http://kandoe-api.azurewebsites.net/';
    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');
    }

    public getOrganisationsByUser() {
        var apiURL = this.apiPrefix + 'api/organisations/by-organiser/' + localStorage.getItem('user_id');
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public getOrganisationById(organisationId: number) {
        var apiURL = this.apiPrefix + 'api/verbose/organisations/' + organisationId;
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public postOrganisation(organisation: Organisation) {
        var apiURL = this.apiPrefix + 'api/organisations';
        return this.authHttp.post(apiURL, JSON.stringify(organisation), { headers: this.header });
    }

    public putOrganisation(organisationToChange: Organisation) {
        var apiURL = this.apiPrefix + 'api/organisations';
        return this.authHttp.put(apiURL, JSON.stringify(organisationToChange), { headers: this.header });
    }

    public organisationsFromJson(data: any): Array<Organisation> {
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

    public organisationFromJson(data: any): Organisation {
        var organisation: Organisation = new Organisation();
        organisation.id = data.Id;
        organisation.name = data.Name;
        organisation.organiserId = data.OrganiserId;
        organisation.sessions = data.Sessions;
        organisation.themes = data.Themes;
        return organisation;
    }


}
