///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
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
var account_forms_component_1 = require('./account/account-forms.component');
var home_component_1 = require('./home/home.component');
var profile_component_1 = require('./account/profile.component');
var sessions_component_1 = require('./session/sessions.component');
var messages_component_1 = require('./message/messages.component');
var organisations_component_1 = require('./session/organisations.component');
var themes_component_1 = require('./session/themes.component');
var cards_component_1 = require('./session/cards.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app"
        }),
        core_1.View({
            directives: [account_forms_component_1.AccountFormsComponent, home_component_1.HomeComponent, profile_component_1.ProfileComponent, router_1.ROUTER_DIRECTIVES],
            template: "<router-outlet></router-outlet>"
        }),
        router_1.RouteConfig([
            { path: "/home", name: "Home", component: home_component_1.HomeComponent },
            { path: "/account", name: "AccountForms", component: account_forms_component_1.AccountFormsComponent, useAsDefault: true },
            { path: "/profiel", name: "Profile", component: profile_component_1.ProfileComponent },
            { path: "/sessies/:id", name: "Sessions", component: sessions_component_1.SessionsComponent },
            { path: "/organisaties", name: "Organisations", component: organisations_component_1.OrganisationsComponent },
            { path: "/berichten", name: "Messages", component: messages_component_1.MessagesComponent },
            { path: "/themas", name: "Themes", component: themes_component_1.ThemesComponent },
            { path: "/kaartjes", name: "Cards", component: cards_component_1.CardsComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.js.map