import {Message} from '../../message/model/message';
import {Organisation} from '../../session/model/organisation';
import {Session} from '../../session/model/session';
import {Subtheme} from '../../session/model/subtheme';
import {Theme} from '../../session/model/theme';

export class Account {

    public id: number;
    public email: string;
    public name: string;
    public surname: string;
    public picture: string;
    public secret: string;

    public chatMessages: Array<Message>;
    public organisations: Array<Organisation>;
    public organisedSessions: Array<Session>;
    public participatingSessions: Array<Session>;
    public subthemes: Array<Subtheme>;
    public themes: Array<Theme>;

}