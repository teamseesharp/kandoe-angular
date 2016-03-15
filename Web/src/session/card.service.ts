import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Card} from './model/card';

@Injectable()
export class CardService {

    public apiPrefix: string = 'http://localhost:51787/';
    //public apiPrefix: string = 'http://kandoe-api.azurewebsites.net/';
    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');
    }

    public getCardsBySubtheme() {
        var apiURL = this.apiPrefix + 'api/selection-cards/by-subtheme/' ;
        return this.authHttp.get(apiURL, { headers: this.header });
    }

   
}