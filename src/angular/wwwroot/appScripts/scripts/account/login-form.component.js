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
var login_1 = require('../account/model/login');
var angular2_jwt_1 = require('angular2-jwt/angular2-jwt');
var LoginFormComponent = (function () {
    function LoginFormComponent(_router, authHttp) {
        this._router = _router;
        this.authHttp = authHttp;
        this.lock = new Auth0Lock('oFgQBmfslHqeahYk2ivNNAzkgcPgwTa8', 'kandoe.eu.auth0.com');
        this.model = new login_1.Login(1, "Bennie", "Helsen");
        this.submitted = false;
    }
    LoginFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this._router.navigate(['Home']);
    };
    LoginFormComponent.prototype.getSecretThing = function () {
        this.authHttp.get('http://kandoe.eu.auth0.com')
            .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
    };
    LoginFormComponent.prototype.login = function () {
        this.lock.show(function (err, profile, id_token) {
            if (err) {
                throw new Error(err);
            }
            localStorage.setItem('profile', JSON.stringify(profile));
            localStorage.setItem('id_token', id_token);
            console.log(this.jwtHelper.decodeToken(id_token), this.jwtHelper.getTokenExpirationDate(id_token), this.jwtHelper.isTokenExpired(id_token));
            this.loggedIn();
        });
    };
    LoginFormComponent.prototype.logout = function () {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        this.loggedIn();
    };
    LoginFormComponent.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
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
        __metadata('design:paramtypes', [router_1.Router, angular2_jwt_1.AuthHttp])
    ], LoginFormComponent);
    return LoginFormComponent;
})();
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=login-form.component.js.map