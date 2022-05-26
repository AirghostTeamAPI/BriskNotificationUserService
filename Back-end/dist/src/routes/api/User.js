"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const express_1 = require("express");
const user_1 = require("../../services/user");
const user_2 = require("../../repository/user");
const User_1 = tslib_1.__importDefault(require("../../models/User"));
const passport_1 = tslib_1.__importDefault(require("passport"));
const router = express_1.Router();
router.post("/user/auth", (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.login, req.body.password);
        const jwtToken = yield user_1.authenticateUser(req.body.login, req.body.password);
        if (req.body.pushToken) {
            user_2.findUserAndUpdateToken(req.body.login, req.body.pushToken);
        }
        return res.status(http_status_codes_1.default.OK).json({ jwtToken });
        console.log(jwtToken);
    }
    catch (err) {
        console.error(err.message);
        res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}));
router.get("/user/viewedFols", passport_1.default.authenticate('bearer', { session: false }), (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = (req.user);
        console.log(foundUser);
        const userFols = foundUser.viewedFols;
        return res.status(http_status_codes_1.default.OK).json({ userFols });
    }
    catch (err) {
        console.log(err);
    }
}));
router.post("/fol/:folId", passport_1.default.authenticate('bearer', { session: false }), (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = (req.user);
        const foundLogin = yield User_1.default.findOne({ login: foundUser.login });
        foundLogin.viewedFols.push(req.params.folId);
        yield User_1.default.updateOne({ login: foundLogin.login }, foundLogin);
        console.log(foundLogin);
        return res.status(http_status_codes_1.default.OK).json({ foundLogin });
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
//# sourceMappingURL=User.js.map