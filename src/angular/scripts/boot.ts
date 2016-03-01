import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from "angular2/http";
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import {AuthHttp, AuthConfig} from 'angular2-jwt/angular2-jwt';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    [
        HTTP_PROVIDERS,
        provide(AuthHttp, {
            useFactory: (http) => {
                return new AuthHttp(new AuthConfig(), http);
            },
            deps: [Http]
        }),
        AuthHttp
    ]
]);