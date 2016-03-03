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
var session_type_pipe_1 = require('./session-type.pipe');
var router_1 = require('angular2/router');
var SessionsComponent = (function () {
    function SessionsComponent(_router, _routeParams) {
        this._router = _router;
        this._routeParams = _routeParams;
        this.types = [session_2.SessionType.sync, session_2.SessionType.async];
        this.model = new session_1.Session("", session_2.SessionType.async, "", new Date(Date.now()), new Date(Date.now()));
        var ses1 = new session_1.Session("test1.com", session_2.SessionType.sync, "beschrijving", new Date(2016, 0, 12), new Date(2016, 5, 17));
        var ses2 = new session_1.Session("test2.com", session_2.SessionType.sync, "minder goede beschrijving", new Date(2016, 1, 7), new Date(2016, 10, 27));
        var ses3 = new session_1.Session("test3.com", session_2.SessionType.async, "zeer goede beschrijving", new Date(2016, 1, 27), new Date(2016, 7, 8));
        ses1.id = 1;
        ses2.id = 2;
        ses3.id = 3;
        this.sessions = [ses1, ses2, ses3];
        this.sessionDetail = new session_1.Session("", session_2.SessionType.sync, "", new Date(), new Date());
        this.progress = "width: 0%";
        this.sessionDetailHidden = true;
    }
    SessionsComponent.prototype.onSelect = function (session) {
        this.sessionDetail = session;
        this.calculateProgress();
        this.sessionDetailHidden = false;
    };
    SessionsComponent.prototype.onSubmit = function () {
        this.model.link = "url/#/sessies/id";
        this.model.start = new Date(Date.parse(this.model.start.toString()));
        this.model.end = new Date(Date.parse(this.model.end.toString()));
        this.sessions.push(this.model);
        this.model = new session_1.Session("", session_2.SessionType.async, "", new Date(Date.now()), new Date(Date.now()));
    };
    SessionsComponent.prototype.calculateProgress = function () {
        var startDateInMs = this.sessionDetail.start.getTime();
        var endDateInMs = this.sessionDetail.end.getTime();
        var currentDateInMs = new Date(Date.now()).getTime();
        var result = (currentDateInMs - startDateInMs) / (endDateInMs - startDateInMs) * 100;
        if (result > 100)
            result = 100;
        if (result < 0)
            result = 0;
        this.progress = "width: " + result + "%";
    };
    SessionsComponent = __decorate([
        core_1.Component({
            directives: [heading_component_1.HeadingComponent, body_content_component_1.BodyContentComponent, sidebar_component_1.SidebarComponent],
            templateUrl: 'Views/session/Sessions.html',
            pipes: [session_type_pipe_1.SessionTypePipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams])
    ], SessionsComponent);
    return SessionsComponent;
})();
exports.SessionsComponent = SessionsComponent;
//# sourceMappingURL=sessions.component.js.map