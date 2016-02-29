(function (Role) {
    Role[Role["user"] = 0] = "user";
    Role[Role["aorganisator"] = 1] = "aorganisator";
})(exports.Role || (exports.Role = {}));
var Role = exports.Role;
var Account = (function () {
    function Account(email, name, picture, role, secret) {
        this.email = email;
        this.name = name;
        this.picture = picture;
        this.role = role;
        this.secret = secret;
    }
    return Account;
})();
exports.Account = Account;
//# sourceMappingURL=account.js.map