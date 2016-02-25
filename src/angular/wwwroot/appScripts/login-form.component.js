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
var login_1 = require('./login');
var LoginFormComponent = (function () {
    function LoginFormComponent(_router) {
        this._router = _router;
        this.model = new login_1.Login("Bennie", "Helsen");
        this.submitted = false;
    }
    LoginFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this._router.navigate(['Home']);
    };
    Object.defineProperty(LoginFormComponent.prototype, "diagnostic", {
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            templateUrl: 'Views/account/login/Login-form.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], LoginFormComponent);
    return LoginFormComponent;
})();
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=login-form.component.js.map