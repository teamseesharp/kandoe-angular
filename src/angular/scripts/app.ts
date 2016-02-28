///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {AccountFormsComponent} from './account/account-forms.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './account/profile.component';
import {SessionsComponent} from './sessions/sessions.component';
import {MessagesComponent} from './messages/messages.component';

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
    { path: "/berichten", name: "Messages", component: MessagesComponent }
])

export class AppComponent {
}