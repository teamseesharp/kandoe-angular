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
var router_1 = require('angular2/router');
var session_1 = require('../session/model/session');
var session_2 = require('../session/model/session');
var organisation_1 = require('../session/model/organisation');
var SidebarComponent = (function () {
    function SidebarComponent() {
        this.sessions = [
            new session_1.Session(3, "sessie 1", session_2.SessionType.sync, new Date(Date.now()), new Date(Date.now())),
            new session_1.Session(7, "sessie 4", session_2.SessionType.async, new Date(Date.now()), new Date(Date.now())),
            new session_1.Session(9, "sessie 7", session_2.SessionType.sync, new Date(Date.now()), new Date(Date.now()))
        ];
        this.organisations = [
            new organisation_1.Organisation(1, "KdG"),
            new organisation_1.Organisation(2, "De Baldadige Bierbowlers")
        ];
    }
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'sidebar'
        }),
        core_1.View({
            directives: [router_1.ROUTER_DIRECTIVES],
            templateUrl: 'Views/defaultcomponents/Sidebar.html'
        }), 
        __metadata('design:paramtypes', [])
    ], SidebarComponent);
    return SidebarComponent;
})();
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map