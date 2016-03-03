var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var session_1 = require('../session/model/session');
var session_2 = require('../session/model/session');
var organisation_1 = require('../session/model/organisation');
var theme_1 = require('../session/model/theme');
var card_1 = require('../session/model/card');
var SidebarComponent = (function () {
    function SidebarComponent() {
        var ses1 = new session_1.Session("sessionlink.com", session_2.SessionType.sync, "beschrijving", new Date(Date.now()), new Date(Date.now()));
        var ses2 = new session_1.Session("sessionlink.com", session_2.SessionType.sync, "minder goede beschrijving", new Date(Date.now()), new Date(Date.now()));
        var ses3 = new session_1.Session("sessionlink.com", session_2.SessionType.async, "zeer goede beschrijving", new Date(Date.now()), new Date(Date.now()));
        ses1.id = 1;
        ses2.id = 2;
        ses3.id = 3;
        this.sessions = [ses1, ses2, ses3];
        this.organisations = [
            new organisation_1.Organisation("KdG", ""),
            new organisation_1.Organisation("De Baldadige Bierbowlers", "")
        ];
        this.themes = [
            new theme_1.Theme(1, "Avondje uit", "Welk café nemen we?", "drinken, gezelligheid, bier"),
            new theme_1.Theme(2, "Nieuw tennisveld", "Welke ondergrond kiezen we, gravel of hard court?", "tennisveld, gravel, hard court")
        ];
        this.cards = [
            new card_1.Card("Dit is een kaartje voor het verlagen van een verkeersdrempel in de gemeente", 0),
            new card_1.Card("Dit is een kaartje voor het organiseren van een wielerwedstrijd", 0)
        ];
    }
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'sidebar'
        }),
        core_1.View({
            directives: [router_1.ROUTER_DIRECTIVES],
            templateUrl: 'Views/defaultcomponents/Sidebar.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SidebarComponent);
    return SidebarComponent;
})();
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map