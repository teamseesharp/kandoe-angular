export enum SessionType {
    sync,
    async
}

export class Session {
    public id: number
    public cardReviewAllowed: boolean
    public cardCreationsAllowed: boolean

    constructor(
        public link: string,
        public type: SessionType,

        public description: string,
        public start: Date,
        public end: Date
    ) { }
}