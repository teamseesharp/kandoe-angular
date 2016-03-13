export enum SessionType {
    sync,
    async
}

export class Session {
    public cardReviewAllowed: boolean
    public cardCreationsAllowed: boolean
    public users: Array<String>
    public id: number

    constructor(
        public link: string,
        public type: SessionType,
        public description: string,
        public start: Date,
        public end: Date,
        public subtheme: string
    ) { }
}