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
var login_form_component_1 = require('./login-form.component');
var register_form_component_1 = require('./register-form.component');
var AccountFormsComponent = (function () {
    function AccountFormsComponent() {
    }
    AccountFormsComponent = __decorate([
        core_1.Component({}),
        core_1.View({
            directives: [login_form_component_1.LoginFormComponent, register_form_component_1.RegisterFormComponent],
            templateUrl: 'Views/account/Account.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AccountFormsComponent);
    return AccountFormsComponent;
})();
exports.AccountFormsComponent = AccountFormsComponent;
//# sourceMappingURL=account-forms.component.js.map