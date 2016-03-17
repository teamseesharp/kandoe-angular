import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';
import {Response, Headers} from 'angular2/http';

import {Message} from './model/message';

@Injectable()
export class MessageService {
    public apiPrefix: string = 'http://kandoe-api.azurewebsites.net/';
    public header: Headers = new Headers();

    constructor(private authHttp: AuthHttp) {
        this.header.append('Accept', 'text/json');
        this.header.append('Content-Type', 'application/json');
    }

    public getMessagesBySession(sessionId: number) {
        var apiURL = this.apiPrefix + 'api/chat-messages/by-session/' + sessionId;
        return this.authHttp.get(apiURL, { headers: this.header });
    }

    public postMessage(message: Message) {
        var apiURL = this.apiPrefix + 'api/chat-messages';
        console.log("string: " + JSON.stringify(message));
        return this.authHttp.post(apiURL, JSON.stringify(message), { headers: this.header });
    }
}