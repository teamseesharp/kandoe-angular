import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Session} from './model/session';

@Injectable()
export class SessionService {
    
    public apiPrefix: string = 'http://kandoe-api.azurewebsites.net/';
    //public apiPrefix: string = 'http://localhost:9000/';
    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');
    }

    public getSessionsByUser() {
        var apiURL = this.apiPrefix + 'api/sessions/by-user/' + localStorage.getItem('user_id');
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public getSessionsBySubtheme(subthemeId: number) {
        var apiURL = this.apiPrefix + 'api/sessions/by-subtheme/' + subthemeId;
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
            session.id = data[i].Id;
            session.description = data[i].Description;
            session.cardCreationAllowed = data[i].CardCreationAllowed;
            session.currentPlayerIndex = data[i].CurrentPlayerIndex;
            session.isFinished = data[i].IsFinished;
            session.maxCardsToChoose = data[i].MaxCardsToChoose;
            session.maxParticipants = data[i].MaxParticipants;
            session.modus = data[i].Modus;
            session.organisationId = data[i].OrganisationId;
            session.round = data[i].Round;
            session.subthemeId = data[i].SubthemeId;
            session.start = new Date(Date.parse(data[i].Start));
            session.end = new Date(Date.parse(data[i].End));
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
        session.id = data.Id;
        session.description = data.Description;
        session.cardCreationAllowed = data.CardCreationAllowed;
        session.currentPlayerIndex = data.CurrentPlayerIndex;
        session.isFinished = data.IsFinished;
        session.maxCardsToChoose = data.MaxCardsToChoose;
        session.maxParticipants = data.MaxParticipants;
        session.modus = data.Modus;
        session.organisationId = data.OrganisationId;
        session.round = data.Round;
        session.subthemeId = data.SubthemeId;
        session.start = new Date(Date.parse(data.Start));
        session.end = new Date(Date.parse(data.End));
        session.sessionCards = data.SessionCards;
        session.chatMessages = data.ChatMessages;
        session.organisers = data.Organisers;
        session.participants = data.Participants;
        return session;
    }
}