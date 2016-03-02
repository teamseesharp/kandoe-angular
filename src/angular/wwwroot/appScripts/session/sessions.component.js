var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var heading_component_1 = require('../defaultcomponents/heading.component');
var body_content_component_1 = require('../defaultcomponents/body-content.component');
var sidebar_component_1 = require('../defaultcomponents/sidebar.component');
var session_1 = require('./model/session');
var session_2 = require('./model/session');
var router_1 = require('angular2/router');
var SessionsComponent = (function () {
    function SessionsComponent(_router, _routeParams) {
        this._router = _router;
        this._routeParams = _routeParams;
        this.model = new session_1.Session("", session_2.SessionType.async, "", new Date(Date.now()), new Date(Date.now()));
        var ses1 = new session_1.Session("sessionlink.com", session_2.SessionType.sync, "beschrijving", new Date(Date.now()), new Date(Date.now()));
        var ses2 = new session_1.Session("sessionlink.com", session_2.SessionType.sync, "minder goede beschrijving", new Date(Date.now()), new Date(Date.now()));
        var ses3 = new session_1.Session("sessionlink.com", session_2.SessionType.async, "zeer goede beschrijving", new Date(Date.now()), new Date(Date.now()));
        ses1.id = 1;
        ses2.id = 2;
        ses3.id = 3;
        this.sessions = [ses1, ses2, ses3];
        this.sessionDetail = new session_1.Session("www.myurl.be", session_2.SessionType.sync, "test", new Date(Date.now()), new Date(Date.now()));
        this.sessionTypes = [session_2.SessionType.async, session_2.SessionType.sync];
    }
    SessionsComponent.prototype.onSelect = function (session) {
        this.sessionDetail = session;
        //this._router.navigate(['Sessions', { id: session.id }]);
    };
    SessionsComponent = __decorate([
        core_1.Component({}),
        core_1.View({
            directives: [heading_component_1.HeadingComponent, body_content_component_1.BodyContentComponent, sidebar_component_1.SidebarComponent],
            templateUrl: 'Views/session/Sessions.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams])
    ], SessionsComponent);
    return SessionsComponent;
})();
exports.SessionsComponent = SessionsComponent;
//# sourceMappingURL=sessions.component.js.map