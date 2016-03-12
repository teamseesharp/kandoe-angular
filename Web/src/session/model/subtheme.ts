import {Card} from './card';
import {Session} from './session';

export class Subtheme {

    public id: number;
    public name: string;
    public organiserId: number;
    public themeId: number;

    public selectionCards: Array<Card>;
    public sessions: Array<Session>;

}