"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resend = exports.verify = void 0;
const middlewares_1 = require("../middlewares");
const joi_1 = require("../helpers/validators/joi");
const models_1 = require("../models");
const parameters_1 = require("../helpers/validators/parameters");
const auth_1 = require("../auth");
const mail_1 = require("../helpers/mail");
exports.verify = middlewares_1.catchAsync(async (req, res) => {
    await joi_1.validate(parameters_1.verifyEmailSchema, req.query);
    const { id } = req.query;
    const user = await models_1.User.findById(id).select('verifiedAt');
    if (!user || !models_1.User.hasValidVerificationUrl(req.originalUrl, req.query)) {
        throw new models_1.HttpError(400, 'INVALID_ACTIVATION_LINK', 'Invalid activation link');
    }
    if (user.verifiedAt) {
        throw new models_1.HttpError(400, 'ALREADY_VERIFIED', 'User already verified');
    }
    await auth_1.markAsVerified(user);
    res.json({ message: 'OK' });
});
exports.resend = middlewares_1.catchAsync(async (req, res) => {
    await joi_1.validate(parameters_1.resendEmailSchema, req.body);
    const { email } = req.body;
    const user = await models_1.User.findOne({ email }).select('email verifiedAt');
    if (user && !user.verifiedAt) {
        const link = user.verificationUrl();
        await mail_1.sendMail({
            to: email,
            subject: 'Verify your email address',
            text: link
        });
    }
    res.json({
        message: 'If your email address needs to be verified, you will receive an email with the activation link'
    });
});
//# sourceMappingURL=verify.js.map