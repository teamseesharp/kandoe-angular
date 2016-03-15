import {Card} from './card';
import {Message} from '../../message/model/message';
import {Account} from '../../account/model/account';
import {Subtheme} from './subtheme';

export enum SessionType {
    sync,
    async
}

export class Session {
    // voorlopig houden voor build, later wordt description van session gewoon de description van subthema
    public description: string;

    public id: number;
    public cardCreationAllowed: boolean;
    public currentPlayerIndex: number;
    public end: Date;
    public isFinished: boolean;
    public maxCardsToChoose: number;
    public maxParticipants: number;
    public modus: SessionType;
    public organisationId: number;
    public round: number;
    public subthemeId: number;
    public start: Date;

    public sessionCards: Array<Card>;
    public chatMessages: Array<Message>;
    public organisers: Array<Account>;
    public participants: Array<Account>;

}
/*
export class SessionDto {
    public description: string;

    public id: number;
    public cardCreationAllowed: boolean;
    public currentPlayerIndex: number;
    public end: Date;
    public isFinished: boolean;
    public maxCardsToChoose: number;
    public maxParticipants: number;
    public modus: SessionType;
    public organisationId: number;
    public round: number;
    public subthemeId: number;
    public start: Date;

    public sessionCards: Array<Card>;
    public chatMessages: Array<Message>;
    public organisers: Array<Account>;
    public participants: Array<Account>;

    constructor(session: Session) {
        this.id = session.id;
        this.cardCreationAllowed = session.cardCreationAllowed;
        this.currentPlayerIndex= session.currentPlayerIndex;
        this.end = session.end;
        this.isFinished = session.isFinished;
        this.maxCardsToChoose = session.maxCardsToChoose;
        this.maxParticipants = session.maxParticipants;
        this.modus = session.modus;
        this.organisationId = session.organisationId;
        this.round = session.round;
        this.subthemeId = session.subtheme.id;
        this.start = session.start;

        this.sessionCards = session.sessionCards;
        this.chatMessages = session.chatMessages;
        this.organisers = session.organisers;
        this.participants = session.participants;
    }

}*/