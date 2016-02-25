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
var register_1 = require('./register');
var RegisterFormComponent = (function () {
    function RegisterFormComponent() {
        this.model = new register_1.Register("Bennie", "Helsen", "helsen.bennie@hotmail.be", "Test1234");
        this.submitted = false;
    }
    RegisterFormComponent.prototype.onSubmit = function () { this.submitted = true; };
    Object.defineProperty(RegisterFormComponent.prototype, "diagnostic", {
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    RegisterFormComponent = __decorate([
        core_1.Component({
            selector: 'register-form',
            templateUrl: 'Views/account/register/Register-form.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], RegisterFormComponent);
    return RegisterFormComponent;
})();
exports.RegisterFormComponent = RegisterFormComponent;
//# sourceMappingURL=register-form.component.js.map