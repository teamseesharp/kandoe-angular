///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {AccountFormsComponent} from './account/account-forms.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './account/profile.component';
import {SessionsComponent} from './session/sessions.component';
import {MessagesComponent} from './message/messages.component';
import {OrganisationsComponent} from './session/organisations.component';
import {OrganisationComponent} from './session/organisation.component';
import {ThemesComponent} from './session/themes.component';
import {CardsComponent} from './session/cards.component';
import {SessionComponent} from './session/session.component';


@Component({
    selector: "my-app"
})
@View({
    directives: [AccountFormsComponent, HomeComponent, ProfileComponent, ROUTER_DIRECTIVES],
    template: `<router-outlet></router-outlet>`
})

@RouteConfig([
    { path: "/home", name: "Home", component: HomeComponent },
    { path: "/account", name: "AccountForms", component: AccountFormsComponent, useAsDefault: true },
    { path: "/profiel", name: "Profile", component: ProfileComponent },
    { path: "/sessies", name: "Sessions", component: SessionsComponent },
    { path: "/sessies/:id", name: "Session", component: SessionComponent },
    { path: "/organisaties", name: "Organisations", component: OrganisationsComponent },
    { path: "/organisaties/:id", name: "Organisation", component: OrganisationComponent},
    { path: "/berichten", name: "Messages", component: MessagesComponent },
    { path: "/themas", name: "Themes", component: ThemesComponent },
    { path: "/kaartjes", name: "Cards", component: CardsComponent }
])

export class AppComponent {
}