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
var organisation_1 = require('./model/organisation');
var router_1 = require('angular2/router');
var OrganisationsComponent = (function () {
    function OrganisationsComponent(_router) {
        this._router = _router;
        this.model = new organisation_1.Organisation("", "");
        var org1 = new organisation_1.Organisation("KdG", "Marvin");
        var org2 = new organisation_1.Organisation("De Baldadige Bierbowlers", "Louise");
        var org3 = new organisation_1.Organisation("FC De Kampioenen", "Jolyn");
        var org4 = new organisation_1.Organisation("De postduif", "Luc");
        org1.id = 1;
        org2.id = 2;
        org3.id = 3;
        org4.id = 4;
        this.organisations = [org1, org2, org3, org4];
    }
    OrganisationsComponent.prototype.onSubmit = function () {
        this.organisations.push(this.model);
        this.model = new organisation_1.Organisation("", "");
    };
    OrganisationsComponent.prototype.onEdit = function (organisation) {
        this._router.navigate(['Organisation', { id: organisation.id }]);
    };
    OrganisationsComponent.prototype.onClose = function () {
        alert('hello');
    };
    OrganisationsComponent = __decorate([
        core_1.Component({
            directives: [heading_component_1.HeadingComponent, body_content_component_1.BodyContentComponent, sidebar_component_1.SidebarComponent],
            templateUrl: 'Views/session/Organisations.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], OrganisationsComponent);
    return OrganisationsComponent;
})();
exports.OrganisationsComponent = OrganisationsComponent;
//# sourceMappingURL=organisations.component.js.map