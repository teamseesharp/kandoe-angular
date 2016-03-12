import {Subtheme} from './subtheme';
import {Session} from './session';

export class Card {
    
    public id: number;
    public image: string;
    public sessionId: number;
    public sessionLevel: number;
    public subthemeId: number;
    public text: string;
    public themeId: string;

    public subthemes: Array<Subtheme>;
    public sessions: Array<Session>;

}