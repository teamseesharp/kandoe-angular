export class Organisation {

    public id: number
    public users: Array<String>;

    constructor(
        public name: string,
        public owner: string
    ) { }
}