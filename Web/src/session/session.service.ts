import {Injectable, Component}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Session} from './model/session';

import {CardService} from './card.service';

@Injectable()
export class SessionService {
    
    public apiPrefix: string = 'http://kandoe-api.azurewebsites.net/';
    //public apiPrefix: string = 'http://localhost:9000/';
    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp, private _cardService: CardService) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');
    }

    public getSessionVerbose(id: number) {
        var apiURL = this.apiPrefix + 'api/verbose/sessions/' + id.toString();
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public getSessionsByUser() {
        var apiURL = this.apiPrefix + 'api/sessions/by-user/' + localStorage.getItem('user_id');
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public getSessionsBySubtheme(subthemeId: number) {
        var apiURL = this.apiPrefix + 'api/sessions/by-subtheme/' + subthemeId;
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public getSessionsByOrganisation(organisationId: number) {
        var apiURL = this.apiPrefix + 'api/sessions/by-organisation/' + organisationId;
        return this.authHttp.get(apiURL, { headers: this.header });
    }
    
    public postSession(session: Session) {
        var apiURL = this.apiPrefix + 'api/sessions';
        return this.authHttp.post(apiURL, JSON.stringify(session), { headers: this.header });
    }
}