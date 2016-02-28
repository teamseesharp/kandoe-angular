enum SessionType {
    sync,
    async
}

export class Session {
    constructor(
        public id: number,
        public type: SessionType,
        public start: Date,
        public end: Date
    ) { }
}