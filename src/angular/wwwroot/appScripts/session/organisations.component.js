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
var OrganisationsComponent = (function () {
    function OrganisationsComponent() {
        this.model = new organisation_1.Organisation("", "");
        this.submitted = false;
        var org1 = new organisation_1.Organisation("KdG", "");
        var org2 = new organisation_1.Organisation("De Baldadige Bierbowlers", "");
        org1.id = 1;
        org2.id = 2;
        this.organisations = [org1, org2];
    }
    OrganisationsComponent.prototype.onSubmit = function () {
        this.submitted = true;
    };
    OrganisationsComponent = __decorate([
        core_1.Component({}),
        core_1.View({
            directives: [heading_component_1.HeadingComponent, body_content_component_1.BodyContentComponent, sidebar_component_1.SidebarComponent],
            templateUrl: 'Views/session/Organisations.html'
        }), 
        __metadata('design:paramtypes', [])
    ], OrganisationsComponent);
    return OrganisationsComponent;
})();
exports.OrganisationsComponent = OrganisationsComponent;
//# sourceMappingURL=organisations.component.js.map