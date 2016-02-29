import {Component, View} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';


import {Router} from 'angular2/router';

@Component({
    selector: 'heading'
})
@View({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'Views/defaultcomponents/Heading.html'
})

export class HeadingComponent {

    constructor(private _router: Router) {
    }

    onSelect(sessionId: number) {
        window.alert("number: " + sessionId);
        this._router.navigate(['Session', sessionId]);
    }
}