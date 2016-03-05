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
var heading_component_1 = require('../defaultcomponents/heading.component');
var body_content_component_1 = require('../defaultcomponents/body-content.component');
var sidebar_component_1 = require('../defaultcomponents/sidebar.component');
var session_1 = require('./model/session');
var session_2 = require('./model/session');
var session_type_pipe_1 = require('./session-type.pipe');
var card_1 = require('./model/card');
var cardContainer_1 = require('./model/cardContainer');
var SessionComponent = (function () {
    function SessionComponent(_router, _routeParams) {
        this._router = _router;
        this._routeParams = _routeParams;
        this.cardGrid = [];
        this.session = new session_1.Session("test.com", session_2.SessionType.sync, "", new Date(Date.now()), new Date(Date.now()));
        this.session.id = parseInt(this._routeParams.get('id'));
        this.players = [];
        this.initCardGrid();
    }
    SessionComponent.prototype.dummyData = function () {
        this.players.push("Caskraker");
        this.players.push("BenNietHier");
        this.players.push("ThoMasmurder");
        this.myCards.push(new card_1.Card("mijn eerste kaart", 0));
        this.myCards.push(new card_1.Card("tweede kaart", 0));
        this.myCards.push(new card_1.Card("laatste kaart", 0));
    };
    SessionComponent.prototype.initCardGrid = function () {
        for (var i = -10; i <= 10; i++) {
            var tempArray = new Array();
            for (var j = -10; j <= 10; j++) {
                if (j != 0) {
                    tempArray.push(new cardContainer_1.CardContainer(i, j, null));
                }
            }
            if (i != 0) {
                this.cardGrid.push(tempArray);
            }
        }
    };
    //testing math.. math awesomeness in progress.. remove this later pl0x..
    SessionComponent.prototype.clickTest = function (item) {
        var r = Math.sqrt(Math.pow(item.xCoordinate, 2) + Math.pow(item.yCoordinate, 2));
        var circle = "geen";
        if (Math.round(r) <= 10 && Math.round(r) >= -10) {
            item.card = new card_1.Card("Dit is een kaart", 0);
            item.setVisibility();
            circle = Math.round(r).toString();
        }
        alert("straal: "
            + r
            + " | zit in cirkel: "
            + circle
            + " | coordinates: "
            + item.xCoordinate
            + ", "
            + item.yCoordinate);
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