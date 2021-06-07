"use strict";
exports.__esModule = true;
exports.User = void 0;
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
    }
    User.prototype.greet = function () {
        return "Shared module, " + this.name + ", age " + this.age;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=index.js.map