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
//import {tokenNotExpired, AuthHttp} from 'angular2-jwt/angular2-jwt';
//declare var Auth0Lock;
var LoginFormComponent = (function () {
    /*lock = new Auth0Lock('oFgQBmfslHqeahYk2ivNNAzkgcPgwTa8', 'kandoe.eu.auth0.com');
    
    constructor(private _router: Router, public authHttp: AuthHttp) {
    }*/
    function LoginFormComponent(_router) {
        this._router = _router;
        this.model = new login_1.Login(1, "Bennie", "Helsen");
        this.submitted = false;
    }
    LoginFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this._router.navigate(['Home']);
    };
    Object.defineProperty(LoginFormComponent.prototype, "diagnostic", {
        /*getSecretThing() {
            this.authHttp.get('http://kandoe.eu.auth0.com')
                .subscribe(
                data => console.log(data.json()),
                err => console.log(err),
                () => console.log('Complete')
            );
        }
    
        login() {
            this.lock.show(function (err: string, profile: string, id_token: string) {
    
                if (err) {
                    throw new Error(err);
                }
    
                localStorage.setItem('profile', JSON.stringify(profile));
                localStorage.setItem('id_token', id_token);
    
                console.log(
                    this.jwtHelper.decodeToken(id_token),
                    this.jwtHelper.getTokenExpirationDate(id_token),
                    this.jwtHelper.isTokenExpired(id_token)
                );
    
                this.loggedIn();
            });
        }
    
        logout() {
            localStorage.removeItem('profile');
            localStorage.removeItem('id_token');
    
            this.loggedIn();
        }
    
        loggedIn() {
            return tokenNotExpired();
        }*/
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