import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Session} from './model/session';

@Injectable()
export class SessionService {
    
    public apiPrefix: string = 'http://kandoe-api.azurewebsites.net/';
    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');
    }

    public getSessionsByUser() {
        var apiURL = this.apiPrefix + 'api/sessions/by-user/' + localStorage.getItem('user_id');
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public postSession(session: Session) {
        var apiURL = this.apiPrefix + 'api/sessions';
        return this.authHttp.post(apiURL, JSON.stringify(session), { headers: this.header });
    }

    public sessionsFromJson(data: any): Array<Session> {
        var sessions: Array<Session> = [];
        for (var i = 0; i < data.length; i++) {
            var session: Session = new Session();
            session.description = data[i].Description;
            session.id = data[i].Id;
            session.cardCreationAllowed = data[i].CardCreationAllowed;
            session.currentPlayerIndex = data[i].CurrentPlayerIndex;
            session.end = data[i].end;
            session.isFinished = data[i].IsFinished;
            session.maxCardsToChoose = data[i].MaxCardsToChoose;
            session.maxParticipants = data[i].MaxParticipants;
            session.modus = data[i].Modus;
            session.organisationId = data[i].OrganisationId;
            session.round = data[i].Round;
            session.subthemeId = data[i].SubthemeId;
            session.start = data[i].Start;
            session.sessionCards = data[i].SessionCards;
            session.chatMessages = data[i].ChatMessages;
            session.organisers = data[i].Organisers;
            session.participants = data[i].Participants;
            sessions.push(session);
        }
        return sessions;
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