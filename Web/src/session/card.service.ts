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

    public cardsFromJson(data: any): Array<Card> {
        var cards: Array<Card> = [];
        for (var i = 0; i < data.length; i++) {
            var card: Card = new Card();
            card.id = data.Id;
            card.sessionId = data.SessionId;
            card.sessionLevel = data.SessionLevel;
            card.subthemeId = data.SubthemeId;
            card.text = data.Text;
            card.themeId = data.ThemeId;
            card.subthemes = data.Subthemes;
            card.sessions = data.Sessions;
            cards.push(card);
        }
        return cards;
    }

   
}