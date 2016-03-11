import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

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

    constructor(private _router: Router) {
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this._router.navigate(['Login']);
    }
}