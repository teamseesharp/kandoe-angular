import { Message } from './message';

export class ChatboxMessage {

    constructor(public message: Message, public accountId: number, public name: string, public picture: string) {

    }
}