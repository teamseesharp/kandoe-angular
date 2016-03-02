var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import {Component, View, OnInit} from 'angular2/core';
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var heading_component_1 = require('../defaultcomponents/heading.component');
var body_content_component_1 = require('../defaultcomponents/body-content.component');
var sidebar_component_1 = require('../defaultcomponents/sidebar.component');
var session_1 = require('./model/session');
var session_2 = require('./model/session');
var session_type_pipe_1 = require('./session-type.pipe');
var SessionComponent = (function () {
    function SessionComponent(_router, _routeParams) {
        this._router = _router;
        this._routeParams = _routeParams;
    }
    SessionComponent.prototype.ngOnInit = function () {
        //vervangen door api call, get van session, id meegeven
        this.session = new session_1.Session("test.com", session_2.SessionType.sync, "", new Date(Date.now()), new Date(Date.now()));
        this.session.id = parseInt(this._routeParams.get('id'));
    };
    SessionComponent = __decorate([
        core_1.Component({
            directives: [heading_component_1.HeadingComponent, body_content_component_1.BodyContentComponent, sidebar_component_1.SidebarComponent, router_1.RouterLink],
            templateUrl: 'Views/session/Session.html',
            pipes: [session_type_pipe_1.SessionTypePipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams])
    ], SessionComponent);
    return SessionComponent;
})();
exports.SessionComponent = SessionComponent;
//# sourceMappingURL=session.component.js.map