import {Session} from './session';
import {Theme} from './theme';

export class Organisation {

    public id: number;
    public name: string;
    public organiserId: number;

    public sessions: Array<Session>;
    public themes: Array<Theme>;

}