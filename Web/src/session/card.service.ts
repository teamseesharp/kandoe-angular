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

    public cardFromJson(data: any): Card {
            var card: Card = new Card();
            card.id = data.Id;
            card.sessionId = data.SessionId;
            card.sessionLevel = data.SessionLevel;
            card.subthemeId = data.SubthemeId;
            card.text = data.Text;
            card.themeId = data.ThemeId;
            card.subthemes = data.Subthemes;
            card.sessions = data.Sessions;
        return card;
    }

    public cardsFromJson(data: any): Array<Card> {
        var cards: Array<Card> = [];
        for (var i = 0; i < data.length; i++) {
            var card: Card = new Card();
            card.id = data[i].Id;
            card.sessionId = data[i].SessionId;
            card.sessionLevel = data[i].SessionLevel;
            card.subthemeId = data[i].SubthemeId;
            card.text = data[i].Text;
            card.themeId = data[i].ThemeId;
            card.subthemes = data[i].Subthemes;
            card.sessions = data[i].Sessions;
            cards.push(card);
        }
        return cards;
    }
   
}