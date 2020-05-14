"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth_1 = require("../auth");
const errors_1 = require("./errors");
const models_1 = require("../models");
exports.auth = errors_1.catchAsync(async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token)
        throw new models_1.Unauthorized();
    const user = (await auth_1.validateToken(token));
    req.context.user = user;
    console.log(user);
    next();
});
//# sourceMappingURL=auth.js.map