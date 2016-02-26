var browser_1 = require('angular2/platform/browser');
var app_1 = require('./app');
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
browser_1.bootstrap(app_1.AppComponent, [
    router_1.ROUTER_PROVIDERS,
    core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })
]);
//# sourceMappingURL=boot.js.map