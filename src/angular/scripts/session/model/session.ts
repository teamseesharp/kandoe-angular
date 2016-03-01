export enum SessionType {
    sync,
    async
}

export class Session {
    public cardReviewAllowed: boolean
    public cardCreationsAllowed: boolean

    constructor(
        public id: number,
        public link: string,
        public type: SessionType,

        public description: string,
        public start: Date,
        public end: Date
    ) { }
}