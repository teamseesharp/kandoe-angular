(function (SessionType) {
    SessionType[SessionType["sync"] = 0] = "sync";
    SessionType[SessionType["async"] = 1] = "async";
})(exports.SessionType || (exports.SessionType = {}));
var SessionType = exports.SessionType;
var Session = (function () {
    function Session(link, type, description, start, end) {
        this.link = link;
        this.type = type;
        this.description = description;
        this.start = start;
        this.end = end;
    }
    return Session;
})();
exports.Session = Session;
//# sourceMappingURL=session.js.map