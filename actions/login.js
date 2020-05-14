"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const middlewares_1 = require("../middlewares");
const joi_1 = require("../helpers/validators/joi");
const parameters_1 = require("../helpers/validators/parameters");
const models_1 = require("../models");
const auth_1 = require("../auth");
exports.login = middlewares_1.catchAsync(async (req, res) => {
    await joi_1.validate(parameters_1.loginSchema, req.body);
    const { logger } = req.context;
    const { email, password } = req.body;
    const user = await models_1.User.findOne({ email });
    logger.info({ message: 'info message' });
    if (!user || !(await user.matchesPassword(password))) {
        throw new models_1.Unauthorized(401, 'INCORRECT_EMAIL_OR_PASSWORD', 'Incorrect email or password');
    }
    if (!user.verifiedAt) {
        throw new models_1.Unauthorized(401, 'USER_NOT_VERIFIED', 'The user is not verified');
    }
    const token = auth_1.createToken(user.id);
    res.json({ token });
});
//# sourceMappingURL=login.js.map