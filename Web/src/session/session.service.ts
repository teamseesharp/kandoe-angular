import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Session} from './model/session';

@Injectable()
export class SessionService {

    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');

    }

    public getSessions() {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var apiURL = 'http://kandoe-api.azurewebsites.net/api/sessions/by-auth0-user-id/' + profile.user_id;
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public patchSession(session: Session) {
        var apiURL = 'http://kandoe-api.azurewebsites.net/api/sessions';
        console.log("verstuurde acc:" + JSON.stringify(session));
        return this.authHttp.patch(apiURL, JSON.stringify(session), { headers: this.header });
    }

    public sessionToJson(session: Session) {


    }

    public sessionFromJson(data: any): Session {
        var session: Session = new Session();
        session.description = data.Description;
        session.id = data.Id;
        session.cardCreationAllowed = data.CardCreationAllowed;
        session.currentPlayerIndex = data.CurrentPlayerIndex;
        session.end = data.end;
        session.isFinished = data.IsFinished;
        session.maxCardsToChoose = data.MaxCardsToChoose;
        session.maxParticipants = data.MaxParticipants;
        session.modus = data.Modus;
        session.organisationId = data.OrganisationId;
        session.round = data.Round;
        session.subthemeId = data.SubthemeId;
        session.start = data.Start;
        session.sessionCards = data.SessionCards;
        session.chatMessages = data.ChatMessages;
        session.organisers = data.Organisers;
        session.participants = data.Participants;
        return session;
    }
}