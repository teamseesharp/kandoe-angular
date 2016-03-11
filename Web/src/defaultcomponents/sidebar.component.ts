import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {Session} from '../session/model/session';
import {SessionType} from '../session/model/session';
import {Organisation} from '../session/model/organisation';
import {Theme} from '../session/model/theme';
import {Card} from '../session/model/card';

@Component({
    selector: 'sidebar'
})
@View({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'src/defaultcomponents/sidebar.html'
})

export class SidebarComponent {

    public sessions: Array<Session>;
    public organisations: Array<Organisation>;
    public themes: Array<Theme>;
    public cards: Array<Card>;
    
    constructor() {
        var ses1 = new Session("sessionlink.com", SessionType.sync, "beschrijving", new Date(Date.now()), new Date(Date.now()));
        var ses2 = new Session("sessionlink.com", SessionType.sync, "minder goede beschrijving", new Date(Date.now()), new Date(Date.now()));
        var ses3 = new Session("sessionlink.com", SessionType.async, "zeer goede beschrijving", new Date(Date.now()), new Date(Date.now()));
        ses1.id = 1;
        ses2.id = 2;
        ses3.id = 3;
        this.sessions = [ses1, ses2, ses3];

        this.organisations = [
            new Organisation("KdG", ""),
            new Organisation("De Baldadige Bierbowlers", "")
        ];
        this.themes = [
            new Theme("Avondje uit", "Welk café nemen we?"),
            new Theme("Nieuw tennisveld", "Welke ondergrond kiezen we, gravel of hard court?")
        ];
        this.cards = [
            new Card("Dit is een kaartje voor het verlagen van een verkeersdrempel in de gemeente", 0),
            new Card("Dit is een kaartje voor het organiseren van een wielerwedstrijd", 0)
        ];
    }
}