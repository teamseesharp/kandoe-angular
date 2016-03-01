var browser_1 = require('angular2/platform/browser');
var app_1 = require('./app');
var core_1 = require('angular2/core');
var http_1 = require("angular2/http");
var router_1 = require('angular2/router');
var angular2_jwt_1 = require('angular2-jwt/angular2-jwt');
browser_1.bootstrap(app_1.AppComponent, [
    router_1.ROUTER_PROVIDERS,
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
    [
        http_1.HTTP_PROVIDERS,
        core_1.provide(angular2_jwt_1.AuthHttp, {
            useFactory: function (http) {
                return new angular2_jwt_1.AuthHttp(new angular2_jwt_1.AuthConfig(), http);
            },
            deps: [http_1.Http]
        }),
        angular2_jwt_1.AuthHttp
    ]
]);
//# sourceMappingURL=boot.js.map