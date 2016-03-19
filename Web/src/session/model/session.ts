import {Card} from './card';
import {Message} from '../../message/model/message';
import {Account} from '../../account/model/account';
import {Subtheme} from './subtheme';

export enum SessionType {
    sync,
    async
}

export class Session {

    public id: number;
    public description: string;
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