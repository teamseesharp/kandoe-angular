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
    templateUrl: 'Views/defaultcomponents/Sidebar.html'
})

export class SidebarComponent {

    public sessions: Array<Session>;
    public organisations: Array<Organisation>;
    public themes: Array<Theme>;
    public cards: Array<Card>;

    constructor() {
        this.sessions = [
            new Session("sessionlink.com", SessionType.sync, "beschrijving", new Date(Date.now()), new Date(Date.now())),
            new Session("sessionlink.com", SessionType.async, "zeer goede beschrijving", new Date(Date.now()), new Date(Date.now())),
            new Session("sessionlink.com", SessionType.sync, "minder goede beschrijving", new Date(Date.now()), new Date(Date.now()))
       ];
        this.organisations = [
            new Organisation(1, "KdG"),
            new Organisation(2, "De Baldadige Bierbowlers")
        ];
        this.themes = [
            new Theme(1, "Avondje uit", "Welk café nemen we?", "drinken, gezelligheid, bier"),
            new Theme(2, "Nieuw tennisveld", "Welke ondergrond kiezen we, gravel of hard court?", "tennisveld, gravel, hard court")
        ];
        this.cards = [
            new Card(1, "Dit is een kaartje voor het verlagen van een verkeersdrempel in de gemeente"),
            new Card(2, "Dit is een kaartje voor het organiseren van een wielerwedstrijd")
        ];
    }
}