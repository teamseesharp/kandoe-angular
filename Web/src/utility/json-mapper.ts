import {Account} from '../account/model/account';
import {Organisation} from '../session/model/organisation';
import {Session} from '../session/model/session';
import {Theme} from '../session/model/theme';
import {Subtheme} from '../session/model/subtheme';
import {Card} from '../session/model/card';

export class AccountJsonMapper {

    public accountFromJson(data: any): Account {
        var account: Account = new Account();
        account.id = data.Id;
        account.email = data.Email;
        account.name = data.Name;
        account.surname = data.Surname;
        account.secret = data.Secret;
        account.picture = data.Picture;
        account.chatMessages = data.ChatMessages;
        account.organisations = data.Organisations;
        account.organisedSessions = data.OrganisedSessions;
        account.participatingSessions = data.ParticipatingSessions;
        account.themes = data.Themes;
        account.subthemes = data.Subthemes;
        return account;
    }
}

export class OrganisationJsonMapper {

    public organisationsFromJson(data: any): Array<Organisation> {
        var organisations: Array<Organisation> = [];
        for (var i = 0; i < data.length; i++) {
            var organisation: Organisation = new Organisation();
            organisation.id = data[i].Id;
            organisation.name = data[i].Name;
            organisation.organiserId = data[i].OrganiserId;
            organisation.sessions = data[i].Sessions;
            organisation.themes = data[i].Themes;
            organisations.push(organisation);
        }
        return organisations;
    }

    public organisationFromJson(data: any): Organisation {
        var organisation: Organisation = new Organisation();
        organisation.id = data.Id;
        organisation.name = data.Name;
        organisation.organiserId = data.OrganiserId;
        organisation.sessions = data.Sessions;
        organisation.themes = data.Themes;
        return organisation;
    }
}

export class SessionJsonMapper {

    private cardMapper: CardJsonMapper = new CardJsonMapper();

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
        session.sessionCards = this.cardMapper.cardsFromJson(data.SessionCards);
        session.chatMessages = data.ChatMessages;
        session.organisers = data.Organisers;
        session.participants = data.Participants;
        return session;
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
            session.sessionCards = this.cardMapper.cardsFromJson(data[i].SessionCards);
            session.chatMessages = data[i].ChatMessages;
            session.organisers = data[i].Organisers;
            session.participants = data[i].Participants;
            sessions.push(session);
        }
        return sessions;
    }
}

export class ThemeJsonMapper {

    private subthemeMapper: SubthemeJsonMapper = new SubthemeJsonMapper();

    public themesFromJson(data: any): Array<Theme> {
        var themes: Array<Theme> = [];
        for (var i = 0; i < data.length; i++) {
            var theme: Theme = new Theme();
            theme.id = data[i].Id;
            theme.name = data[i].Name;
            theme.description = data[i].Description;
            theme.organisationId = data[i].OrganisationId;
            theme.organiserId = data[i].OrganiserId;
            theme.tags = data[i].Tags;
            theme.selectionCards = data[i].SelectionCards;
            theme.subthemes = this.subthemeMapper.subthemesFromJson(data[i].Subthemes);
            themes.push(theme);
        }

        return themes;
    }

    public themeFromJson(data: any): Theme {
        var theme: Theme = new Theme();
        theme.id = data.Id;
        theme.name = data.Name;
        theme.description = data.Description;
        theme.organisationId = data.OrganisationId
        theme.organiserId = data.OrganiserId;
        theme.tags = data.Tags;
        theme.selectionCards = data.SelectionCards;
        theme.subthemes = this.subthemeMapper.subthemesFromJson(data.Subthemes);
        return theme;
    }
}

export class SubthemeJsonMapper {

    public subthemeFromJson(data: any): Subtheme {
        var subtheme: Subtheme = new Subtheme();
        subtheme.id = data.Id;
        subtheme.name = data.Name;
        subtheme.organiserId = data.OrganiserId;
        subtheme.themeId = data.ThemeId;
        subtheme.selectionCards = data.SelectionCards;
        subtheme.sessions = data.Sessions;
        return subtheme;
    }

    public subthemesFromJson(data: any): Array<Subtheme> {
        var subthemes: Array<Subtheme> = [];
        for (var i = 0; i < data.length; i++) {
            var subtheme: Subtheme = new Subtheme();
            subtheme.id = data[i].Id;
            subtheme.name = data[i].Name;
            subtheme.organiserId = data[i].OrganiserId;
            subtheme.themeId = data[i].ThemeId;
            subtheme.selectionCards = data[i].SelectionCards;
            subtheme.sessions = data[i].Sessions;
            subthemes.push(subtheme);
        }
        return subthemes;
    }
}

export class CardJsonMapper {
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