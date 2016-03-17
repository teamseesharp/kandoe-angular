import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Card} from './model/card';

@Injectable()
export class CardService {
    public apiPrefix: string = 'http://kandoe-api.azurewebsites.net/';
    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');
    }

    public getCardsBySubtheme(subThemeId: number) {
        var apiURL = this.apiPrefix + 'api/selection-cards/by-subtheme/' + subThemeId;
        return this.authHttp.get(apiURL, { headers: this.header });
    }
    
    public postCard(card: Card) {
        var apiURL = this.apiPrefix + 'api/selection-cards';
        return this.authHttp.post(apiURL, JSON.stringify(card), { headers: this.header });
    }

    public putCard(card: Card) {
        var apiURL = this.apiPrefix + 'api/selection-cards';
        return this.authHttp.put(apiURL, JSON.stringify(card), { headers: this.header });
    }   
}