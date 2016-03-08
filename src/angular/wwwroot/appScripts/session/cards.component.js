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
var card_1 = require('./model/card');
var CardsComponent = (function () {
    function CardsComponent() {
        this.model = new card_1.Card("", 0);
        this.submitted = false;
        this.cards = [
            new card_1.Card("Kaartje voor verlaging verkeersdrempel", 0),
            new card_1.Card("Kaartje voor organisatie wielerwedstrijd", 0),
            new card_1.Card("Verkiezing verantwoordelijke studentenraad", 1),
            new card_1.Card("Een ander kaartje", 1),
            new card_1.Card("Het vijfde kaartje", 0),
            new card_1.Card("Het allerlaatste kaartje", 0)
        ];
    }
    CardsComponent.prototype.onCreateCard = function () {
        this.cards.push(this.model);
        this.onCloseModal();
    };
    CardsComponent.prototype.onChangeModal = function (card) {
        this.model = card;
        alert("Change modal: " + this.model.text);
        //todo: kaart effectief toevoegen
    };
    CardsComponent.prototype.onChangeCard = function () {
        //todo kaart effectief wijzigen
        alert("Change card: " + this.model.text);
        this.onCloseModal();
    };
    CardsComponent.prototype.onCloseModal = function () {
        this.model = new card_1.Card("", 0);
    };
    CardsComponent = __decorate([
        core_1.Component({}),
        core_1.View({
            directives: [heading_component_1.HeadingComponent, body_content_component_1.BodyContentComponent, sidebar_component_1.SidebarComponent],
            templateUrl: 'Views/session/Cards.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CardsComponent);
    return CardsComponent;
})();
exports.CardsComponent = CardsComponent;
//# sourceMappingURL=cards.component.js.map