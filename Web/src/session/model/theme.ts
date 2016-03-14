import {Card} from './card';
import {Subtheme} from './subtheme';

export class Theme {

    public id: number;
    public name: string;
    public description: string;
    public organisationId: number;
    public organiserId: number;
    public tags: string;

    public selectionCards: Array<Card>;
    public subthemes: Array<Subtheme>;

}