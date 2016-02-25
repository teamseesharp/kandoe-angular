﻿///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {AccountFormsComponent} from './account/account-forms.component';
import {HomeComponent} from './home/home.component';

@Component({
    selector: "my-app"
})
@View({
    directives: [AccountFormsComponent, HomeComponent, ROUTER_DIRECTIVES],
    template: `<router-outlet></router-outlet>`
})

@RouteConfig([
    { path: "/home", name: "Home", component: HomeComponent },
    { path: "/account", name: "AccountForms", component: AccountFormsComponent, useAsDefault: true }
])

export class AppComponent {
}