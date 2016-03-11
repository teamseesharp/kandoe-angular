import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Http, Response} from 'angular2/http';

import {Account} from './model/account';

@Injectable()
export class AccountService {

    test: string;

    constructor(private authHttp: AuthHttp) {

    }

    getAccount() {
        var apiURL = 'http://kandoe-api.azurewebsites.net/api/accounts/by-auth0-user-id/' + localStorage.getItem('profile');
        return this.authHttp.get(apiURL)
            .map(res => <Account> res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}