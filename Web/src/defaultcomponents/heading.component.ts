import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {LoginFormComponent} from '../account/login-form.component';
import {Router} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {AuthHttp} from 'angular2-jwt';

@Component({
    selector: 'heading'
})
@View({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'src/defaultcomponents/heading.html'
})

export class HeadingComponent {
    loginFormComponent: LoginFormComponent;

    constructor(private _router: Router, public http: Http, public authHttp: AuthHttp) {
        this.loginFormComponent = new LoginFormComponent(_router, http, authHttp);
    }

    logout() {
        this.loginFormComponent.logout();
    }
}