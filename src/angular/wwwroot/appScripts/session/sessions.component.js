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
var SessionsComponent = (function () {
    function SessionsComponent() {
        this.sessions = [
            new session_1.Session(3, "sessie 1", session_2.SessionType.sync, new Date(Date.now()), new Date(Date.now())),
            new session_1.Session(7, "sessie 4", session_2.SessionType.async, new Date(Date.now()), new Date(Date.now())),
            new session_1.Session(9, "sessie 7", session_2.SessionType.sync, new Date(Date.now()), new Date(Date.now()))
        ];
    }
    SessionsComponent = __decorate([
        core_1.Component({}),
        core_1.View({
            directives: [heading_component_1.HeadingComponent, body_content_component_1.BodyContentComponent, sidebar_component_1.SidebarComponent],
            templateUrl: 'Views/session/Sessions.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SessionsComponent);
    return SessionsComponent;
})();
exports.SessionsComponent = SessionsComponent;
//# sourceMappingURL=sessions.component.js.map