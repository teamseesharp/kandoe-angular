export enum Role {
    user,
    aorganisator
}

export class Account {
    public id: number

    constructor(
        public email: string,
        public name: string,
        public picture: string,
        public role: Role,
        public secret: string
    ) { }

}