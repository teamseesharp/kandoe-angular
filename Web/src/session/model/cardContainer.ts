import {Card} from './card';

export class CardContainer {

    public visibility: string;

    constructor(
        public xCoordinate: number,
        public yCoordinate: number,
        public card: Card) {
        this.setVisibility();
    }

    public setVisibility() {
        if (this.card.text != "") {
            this.visibility = "opacity: 1";
        } else {
            this.visibility = "opacity: 0";
        }
    }
}