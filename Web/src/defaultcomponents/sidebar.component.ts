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
        this.initializeSessions();
        this.initializeOrganisations();
        this.initializeThemes();
        this.initializeCards();
    }

    initializeSessions() {
        var ses1 = new Session();
        var ses2 = new Session();
        var ses3 = new Session();
        var ses4 = new Session();
        ses1.id = 1;
        ses1.modus = SessionType.sync;
        ses1.description = "beschrijving";
        ses1.start = new Date(2016, 0, 12);
        ses1.end = new Date(2016, 5, 17);
        ses2.id = 2;
        ses2.modus = SessionType.sync;
        ses2.description = "minder goede beschrijving";
        ses2.start = new Date(2016, 1, 7);
        ses2.end = new Date(2016, 10, 27);
        ses3.id = 3;
        ses3.modus = SessionType.async;
        ses3.description = "zeer goede beschrijving";
        ses3.start = new Date(2016, 1, 27);
        ses3.end = new Date(2016, 7, 8);
        ses4.id = 4;
        ses4.modus = SessionType.async;
        ses4.description = "Een gewone beschrijving";
        ses4.start = new Date(2016, 1, 15);
        ses4.end = new Date(2016, 2, 9);
        this.sessions = [ses1, ses2, ses3, ses4];
    }

    initializeOrganisations() {
        var org1 = new Organisation();
        var org2 = new Organisation();
        var org3 = new Organisation();
        var org4 = new Organisation();

        org1.id = 1;
        org1.name = "KdG";
        org2.id = 2;
        org2.name = "De Baldadige Bierbowlers";
        org3.id = 3;
        org3.name = "FC De Kampioenen"
        org4.id = 4;
        org4.name = "De postduif"

        this.organisations = [org1, org2, org3, org4];
    }

    initializeThemes() {
        var theme1 = new Theme();
        var theme2 = new Theme();
        theme1.description = "Welk café nemen we?";
        theme1.name = "Avondje uit";
        theme2.description = "Welke ondergrond kiezen we, gravel of hard court?";
        theme2.name = "Nieuw tennisveld";
    }

    initializeCards() {
        this.cards = [];
        var cardStrings = ["Kaartje voor verlaging verkeersdrempel", "Kaartje voor organisatie wielerwedstrijd", "Verkiezing verantwoordelijke studentenraad", "Een ander kaartje", "Het allerlaatste kaartje"];
        for (var i = 0; i < 5; i++) {
            var card = new Card();
            card.text = cardStrings[i];
        }
    }
}