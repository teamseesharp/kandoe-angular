import {Card} from './card';

export class CardSquare {

    public visibility: string;
    public level: number;

    constructor(
        public xCoordinate: number,
        public yCoordinate: number,
        public card: Card) {
        this.setVisibility();
        this.level = this.calculateLevel();
    }

    public calculateLevel() {
        var r = Math.sqrt(Math.pow(this.xCoordinate, 2) + Math.pow(this.yCoordinate, 2));
        return Math.round(r);
    }

    public setVisibility() {
        if (this.card.text != "") {
            this.visibility = "opacity: 1";
        } else {
            this.visibility = "opacity: 0";
        }
    }
}