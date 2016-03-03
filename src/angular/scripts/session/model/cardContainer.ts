import {Card} from './card';

export class CardContainer {
    public card: Card;
    public visibility: string;

    constructor(
        public xCoordinate: number,
        public yCoordinate: number,
        public visible: boolean ) {
        this.setVisibility(visible);
    }

    public setVisibility(visible: boolean) {
        this.visible = visible;
        if (visible) {
            this.visibility = "opacity: 1";
        } else {
            this.visibility = "opacity: 0";
        }
    }
}