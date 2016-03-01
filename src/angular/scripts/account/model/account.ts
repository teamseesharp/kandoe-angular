export class Account {

    public id: number;
    public name: string;
    public firstname: string;    

    constructor(
        public email: string,
        public password: string
    ) { }
}