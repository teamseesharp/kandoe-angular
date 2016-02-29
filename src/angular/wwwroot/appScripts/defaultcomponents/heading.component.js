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
var router_2 = require('angular2/router');
var HeadingComponent = (function () {
    function HeadingComponent(_router) {
        this._router = _router;
    }
    HeadingComponent.prototype.onSelect = function (sessionId) {
        window.alert("number: " + sessionId);
        this._router.navigate(['Session', sessionId]);
    };
    HeadingComponent = __decorate([
        core_1.Component({
            selector: 'heading'
        }),
        core_1.View({
            directives: [router_1.ROUTER_DIRECTIVES],
            templateUrl: 'Views/defaultcomponents/Heading.html'
        }), 
        __metadata('design:paramtypes', [router_2.Router])
    ], HeadingComponent);
    return HeadingComponent;
})();
exports.HeadingComponent = HeadingComponent;
//# sourceMappingURL=heading.component.js.map