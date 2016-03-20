import {Account} from '../account/model/account';
import {Organisation} from '../session/model/organisation';
import {Session} from '../session/model/session';
import {Theme} from '../session/model/theme';
import {Subtheme} from '../session/model/subtheme';
import {Card} from '../session/model/card';
import {Message} from '../message/model/message';

export class AccountJsonMapper {

    public accountFromJson(data: any): Account {
        var account: Account = new Account();
        account.id = data.Id;
        account.email = data.Email;
        account.name = data.Name;
        account.surname = data.Surname;
        account.secret = data.Secret;
        account.picture = data.Picture;

        account.chatMessages = new ChatMessageJsonMapper().chatMessagesFromJson(data.ChatMessages);
        account.organisations = new OrganisationJsonMapper().organisationsFromJson(data.Organisations);
        account.organisedSessions = new SessionJsonMapper().sessionsFromJson(data.OrganisedSessions);
        account.participatingSessions = new SessionJsonMapper().sessionsFromJson(data.ParticipatingSessions);
        account.themes = new ThemeJsonMapper().themesFromJson(data.Themes);
        account.subthemes = new SubthemeJsonMapper().subthemesFromJson(data.Subthemes);

        return account;
    }

    public accountsFromJson(data: any): Array<Account> {
        var accounts: Array<Account> = [];
        if (data == null) return new Array<Account>();
        for (var i = 0; i < data.length; i++) {
            var account: Account = new Account();
            account.id = data[i].Id;
            account.email = data[i].Email;
            account.name = data[i].Name;
            account.surname = data[i].Surname;
            account.secret = data[i].Secret;
            account.picture = data[i].Picture;

            account.chatMessages = new ChatMessageJsonMapper().chatMessagesFromJson(data[i].ChatMessages);
            account.organisations = new OrganisationJsonMapper().organisationsFromJson(data[i].Organisations);
            account.organisedSessions = new SessionJsonMapper().sessionsFromJson(data[i].OrganisedSessions);
            account.participatingSessions = new SessionJsonMapper().sessionsFromJson(data[i].ParticipatingSessions);
            account.themes = new ThemeJsonMapper().themesFromJson(data[i].Themes);
            account.subthemes = new SubthemeJsonMapper().subthemesFromJson(data[i].Subthemes);

            accounts.push(account);
        }
        return accounts;
    }
}

export class OrganisationJsonMapper {

    public organisationsFromJson(data: any): Array<Organisation> {
        if (data == null) return new Array<Organisation>();
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
    private accountMapper: AccountJsonMapper = new AccountJsonMapper();
    private chatmessageMapper: ChatMessageJsonMapper = new ChatMessageJsonMapper();

    public sessionFromJson(data: any): Session {
        var session: Session = new Session();
        session.id = data.Id;
        session.description = data.Description;
        session.cardCreationAllowed = data.CardCreationAllowed;
        session.currentPlayerIndex = data.CurrentPlayerIndex;
        session.isFinished = data.IsFinished;
        session.maxCardsToChoose = data.MaxCardsToChoose;
        session.maxParticipants = data.MaxParticipants;
        session.organisationId = data.OrganisationId;
        session.round = data.Round;
        session.subthemeId = data.SubthemeId;
        session.start = new Date(Date.parse(data.Start));
        session.end = new Date(Date.parse(data.End));
        session.sessionCards = this.cardMapper.cardsFromJson(data.SessionCards);
        session.chatMessages = this.chatmessageMapper.chatMessagesFromJson(data.ChatMessages);
        session.organisers = this.accountMapper.accountsFromJson(data.Organisers);;
        session.invites = this.accountMapper.accountsFromJson(data.Invites);
        session.participants = this.accountMapper.accountsFromJson(data.Participants);
        return session;
    }

    public sessionsFromJson(data: any): Array<Session> {
        if (data == null) return new Array<Session>();
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
            session.organisationId = data[i].OrganisationId;
            session.round = data[i].Round;
            session.subthemeId = data[i].SubthemeId;
            session.start = new Date(Date.parse(data[i].Start));
            session.end = new Date(Date.parse(data[i].End));
            session.sessionCards = this.cardMapper.cardsFromJson(data[i].SessionCards);
            session.chatMessages = this.chatmessageMapper.chatMessagesFromJson(data[i].ChatMessages);
            session.organisers = this.accountMapper.accountsFromJson(data[i].Organisers);
            session.invites = this.accountMapper.accountsFromJson(data[i].Invites);
            session.participants = this.accountMapper.accountsFromJson(data[i].Participants);
            sessions.push(session);
        }
        return sessions;
    }
}

export class ThemeJsonMapper {

    private subthemeMapper: SubthemeJsonMapper = new SubthemeJsonMapper();

    public themesFromJson(data: any): Array<Theme> {
        if (data == null) return new Array<Theme>();
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
        if (data == null) return new Array<Subtheme>();
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
        if (data == null) return new Array<Card>();
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

export class ChatMessageJsonMapper {
    public chatMessageFromJson(data: any): Message {
        var message: Message = new Message();
        message.id = data.Id;
        message.messengerId = data.MessengerId;
        message.sessionId = data.SessionId;
        message.text = data.Text;
        message.timestamp = new Date(Date.parse(data.Timestamp));
        return message;
    }

    public chatMessagesFromJson(data: any): Array<Message> {
        if (data == null) return new Array<Message>();
        var messages: Array<Message> = [];
        for (var i = 0; i < data.length; i++) {
            var message: Message = new Message();
            message.id = data[i].Id;
            message.messengerId = data[i].MessengerId;
            message.sessionId = data[i].SessionId;
            message.text = data[i].Text;
            message.timestamp = new Date(Date.parse(data[i].Timestamp));
            messages.push(message);
        }
        return messages;
    }
}