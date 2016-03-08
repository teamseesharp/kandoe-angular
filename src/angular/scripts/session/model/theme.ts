import {Organisation} from './organisation';
export class Theme {
    public organisation: Organisation;
    public id: number;

    constructor(
        public name: string,
        public description: string,
        public tags: Array<String>
    ) { }
}