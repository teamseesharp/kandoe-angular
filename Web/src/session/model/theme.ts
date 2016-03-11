import {Organisation} from './organisation';
export class Theme {
    public organisation: Organisation;
    public id: number;
    public tags: Array<String>;

    constructor(
        public name: string,
        public description: string
    ) { }
}