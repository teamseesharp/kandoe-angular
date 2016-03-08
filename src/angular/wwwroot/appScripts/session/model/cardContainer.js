var CardContainer = (function () {
    function CardContainer(xCoordinate, yCoordinate, card) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.card = card;
        this.setVisibility();
    }
    CardContainer.prototype.setVisibility = function () {
        if (this.card != null) {
            this.visibility = "opacity: 1";
        }
        else {
            this.visibility = "opacity: 0";
        }
    };
    return CardContainer;
})();
exports.CardContainer = CardContainer;
//# sourceMappingURL=cardContainer.js.map