"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = exports.emailReset = void 0;
const middlewares_1 = require("../middlewares");
const joi_1 = require("../helpers/validators/joi");
const parameters_1 = require("../helpers/validators/parameters");
const models_1 = require("../models");
const reset_1 = require("../models/schemas/reset");
const mail_1 = require("../helpers/mail");
const auth_1 = require("../auth");
exports.emailReset = middlewares_1.catchAsync(async (req, res) => {
    await joi_1.validate(parameters_1.forgotPasswordSchema, req.body);
    const { email } = req.body;
    const user = await models_1.User.findOne({ email });
    if (user) {
        const token = reset_1.PasswordReset.plaintextToken();
        const reset = await reset_1.PasswordReset.create({ userId: user.id, token });
        await mail_1.sendMail({
            to: email,
            subject: 'Reset your password',
            text: reset.url(token)
        });
    }
    res.json({
        message: 'If you have an account with us, you will receive an email with a link to reset your password'
    });
});
exports.reset = middlewares_1.catchAsync(async ({ query, body }, res) => {
    await joi_1.validate(parameters_1.resetPasswordSchema, { query, body });
    const { id, token } = query;
    const { password } = body;
    const reset = await reset_1.PasswordReset.findById(id);
    let user;
    if (!reset ||
        !reset.isValid(token) ||
        !(user = await models_1.User.findById(reset.userId))) {
        throw new models_1.BadRequest(400, 'INVALID_RESET_TOKEN', 'Invalid password reset token');
    }
    await Promise.all([
        auth_1.resetPassword(user, password),
        reset_1.PasswordReset.deleteMany({ userId: reset.userId })
    ]);
    await mail_1.sendMail({
        to: user.email,
        subject: 'Password reset',
        text: 'Your password was successfully reset'
    });
    res.json({ message: 'OK' });
});
//# sourceMappingURL=reset.js.map