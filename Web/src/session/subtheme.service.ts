import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Subtheme} from './model/subtheme';

@Injectable()
export class SubthemeService {

    //public apiPrefix: string = 'http://localhost:51787/';
    public apiPrefix: string = 'http://kandoe-api.azurewebsites.net/';
    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');
    }

    public getSubthemeById(id: number) {
        var apiURL = this.apiPrefix + 'api/subthemes/{id}' + id.toString();
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public getSubthemesByOrganiser(id: string) {
        var apiURL = this.apiPrefix + 'api/subthemes/by-organiser/' + id;
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public postSubtheme(subtheme: Subtheme) {
        var apiURL = this.apiPrefix + 'api/subthemes';
        return this.authHttp.post(apiURL, JSON.stringify(subtheme), { headers: this.header });
    }

    public updateTheme(subtheme: Subtheme) {
        var apiURL = this.apiPrefix + 'api/subthemes';
        return this.authHttp.put(apiURL, JSON.stringify(subtheme), { headers: this.header });
    }
}