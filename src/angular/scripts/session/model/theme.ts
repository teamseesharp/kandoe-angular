import {Organisation} from './organisation';
export class Theme {
    public organisation: Organisation;

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public tags: string
    ) { }
}