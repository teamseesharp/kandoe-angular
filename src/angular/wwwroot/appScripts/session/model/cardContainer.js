var CardContainer = (function () {
    function CardContainer(xCoordinate, yCoordinate, visible) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.visible = visible;
        this.setVisibility(visible);
    }
    CardContainer.prototype.setVisibility = function (visible) {
        this.visible = visible;
        if (visible) {
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