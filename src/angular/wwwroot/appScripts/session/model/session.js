(function (SessionType) {
    SessionType[SessionType["sync"] = 0] = "sync";
    SessionType[SessionType["async"] = 1] = "async";
})(exports.SessionType || (exports.SessionType = {}));
var SessionType = exports.SessionType;
var Session = (function () {
    function Session(id, description, type, start, end) {
        this.id = id;
        this.description = description;
        this.type = type;
        this.start = start;
        this.end = end;
    }
    return Session;
})();
exports.Session = Session;
//# sourceMappingURL=session.js.map