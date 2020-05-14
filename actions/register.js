"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const middlewares_1 = require("../middlewares");
const joi_1 = require("../helpers/validators/joi");
const parameters_1 = require("../helpers/validators/parameters");
const models_1 = require("../models");
const mail_1 = require("../helpers/mail");
exports.register = middlewares_1.catchAsync(async (req, res) => {
    await joi_1.validate(parameters_1.registerSchema, req.body);
    const { email, name, password } = req.body;
    const found = await models_1.User.exists({ email });
    if (found) {
        throw new models_1.BadRequest();
    }
    const user = await models_1.User.create({
        email,
        name,
        password
    });
    const link = user.verificationUrl();
    mail_1.sendMail({
        to: email,
        subject: 'Verify your email address',
        text: link
    });
    res.json({ link });
});
//# sourceMappingURL=register.js.map