"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserViewedFol = exports.authenticateUser = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = tslib_1.__importDefault(require("../models/User"));
function authenticateUser(login, password) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const foundUser = yield User_1.default.findOne({ login });
        if (foundUser) {
            if (foundUser.password === password) {
                const token = jsonwebtoken_1.sign({
                    id: foundUser.id,
                    username: foundUser.username,
                    equipment: foundUser.equipment,
                    login: foundUser.login,
                }, process.env.JWTSECRET);
                return token;
            }
        }
    });
}
exports.authenticateUser = authenticateUser;
function updateUserViewedFol(login, folId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const foundLogin = yield User_1.default.findOne({ login });
        foundLogin.viewedFols.push(folId);
        yield User_1.default.updateOne({ login: foundLogin.login }, foundLogin);
    });
}
exports.updateUserViewedFol = updateUserViewedFol;
//# sourceMappingURL=user.js.map