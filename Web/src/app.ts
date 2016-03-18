import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {LoginComponent} from './account/login.component';
import {AboutComponent} from './about/about.component';
import {ProfileComponent} from './account/profile.component';
import {HomeComponent} from './home/home.component';
import {SessionsComponent} from './session/sessions.component';
import {MessagesComponent} from './message/messages.component';
import {OrganisationsComponent} from './session/organisations.component';
import {OrganisationComponent} from './session/organisation.component';
import {ThemesComponent} from './session/themes.component';
import {CardsComponent} from './session/cards.component';
import {SessionComponent} from './session/session.component';
import {AnalysisComponent} from './session/analysis.component';
import {SnapshotComponent} from './session/snapshot.component';


@Component({
    selector: "app",
    directives: [ HomeComponent, ProfileComponent, LoginComponent, ROUTER_DIRECTIVES],
    template: `<router-outlet></router-outlet>`
})

@RouteConfig([
    { path: "/", name: "Home", component: HomeComponent, useAsDefault: true }, 
    { path: "/over", name: "About", component: AboutComponent },
    { path: "/snapshot/:id", name: "Snapshot", component: SnapshotComponent },
    { path: "/login", name: "Login", component: LoginComponent },
    { path: "/profiel", name: "Profile", component: ProfileComponent },
    { path: "/sessies", name: "Sessions", component: SessionsComponent },
    { path: "/sessies/organisaties/:id", name: "SessionsByOrganisation", component: SessionsComponent },
    { path: "/sessies/:id", name: "Session", component: SessionComponent },
    { path: "/organisaties", name: "Organisations", component: OrganisationsComponent },
    { path: "/organisaties/:id", name: "Organisation", component: OrganisationComponent},
    { path: "/berichten", name: "Messages", component: MessagesComponent },
    { path: "/themas", name: "Themes", component: ThemesComponent },
    { path: "/themas/organisaties/:id", name: "ThemesByOrganisation", component: ThemesComponent },
    { path: "/kaartjes", name: "Cards", component: CardsComponent },
    { path: "/kaartjes/subthema/:themeId/:subthemeId", name: "CardsBySubtheme", component: CardsComponent },
    { path: "/analyse/:id", name: "Analysis", component: AnalysisComponent }
])

export class AppComponent {
}