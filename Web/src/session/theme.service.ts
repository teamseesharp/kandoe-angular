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
}
