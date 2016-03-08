export class Card {
    public id: number;
    public image: string;

    constructor(
        public text: string,
        public creatorId: number) { }
}