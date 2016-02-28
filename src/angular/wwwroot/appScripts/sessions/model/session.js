var SessionType;
(function (SessionType) {
    SessionType[SessionType["sync"] = 0] = "sync";
    SessionType[SessionType["async"] = 1] = "async";
})(SessionType || (SessionType = {}));
var Session = (function () {
    function Session(id, type, start, end) {
        this.id = id;
        this.type = type;
        this.start = start;
        this.end = end;
    }
    return Session;
})();
exports.Session = Session;
//# sourceMappingURL=session.js.map