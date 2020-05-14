"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.markAsVerified = exports.validateToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("./config");
const models_1 = require("./models");
exports.createToken = (userId) => {
    const token = jsonwebtoken_1.sign({ id: userId }, config_1.JWT_SIGN_KEY, {
        expiresIn: config_1.JWT_EXPIRATION
    });
    return token;
};
exports.validateToken = async (token) => {
    return jsonwebtoken_1.verify(token, config_1.JWT_SIGN_KEY, async (err, decoded) => {
        if (err) {
            throw new models_1.HttpError(500, 'CANNOT_VALIDATE_TOKEN', 'Cannot validate token');
        }
        const result = decoded;
        return await models_1.User.findById(result.id, (err, user) => {
            if (err) {
                throw new models_1.HttpError(500, 'DATABASE_ERROR', 'Problem finding the user');
            }
            if (!user)
                throw new models_1.HttpError(404, 'USER_NOT_FOUND', 'User not found');
            return user;
        });
    });
};
exports.markAsVerified = async (user) => {
    user.verifiedAt = new Date();
    await user.save();
};
exports.resetPassword = async (user, password) => {
    user.password = password;
    await user.save();
};
//# sourceMappingURL=auth.js.map