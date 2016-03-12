import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Http, Response, Headers} from 'angular2/http';

@Injectable()
export class AccountService {

    test: string;

    constructor(private authHttp: AuthHttp) {

    }

    getAccount() {
        var header = new Headers();
        header.append('Accept', 'text/json');
        header.append('Content-Type', 'application/json');
        var profile = JSON.parse(localStorage.getItem('profile'));
        var apiURL = 'http://kandoe-api.azurewebsites.net/api/accounts/by-auth0-user-id/' + profile.user_id;
        return this.authHttp.get(apiURL, { headers: header });
    }
}