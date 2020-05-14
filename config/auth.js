"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_RESET_TIMEOUT = exports.PASSWORD_RESET_BYTES = exports.EMAIL_VERIFICATION_SIGNATURE_BYTES = exports.EMAIL_VERIFICATION_TOKEN_BYTES = exports.EMAIL_VERIFICATION_TIMEOUT = exports.BCRYPT_MAX_BYTES = exports.BCRYPT_WORK_FACTOR = exports.JWT_EXPIRATION = exports.JWT_SIGN_KEY = void 0;
const ONE_HOUR = 1000 * 60 * 60;
const TWELVE_HOURS = ONE_HOUR * 12;
const { env } = process;
_a = env.JWT_SIGN_KEY, exports.JWT_SIGN_KEY = _a === void 0 ? 'super-secret-sign-key' : _a, _b = env.JWT_EXPIRATION, exports.JWT_EXPIRATION = _b === void 0 ? 86400 : _b;
exports.BCRYPT_WORK_FACTOR = 12;
exports.BCRYPT_MAX_BYTES = 72;
exports.EMAIL_VERIFICATION_TIMEOUT = TWELVE_HOURS;
exports.EMAIL_VERIFICATION_TOKEN_BYTES = 40;
exports.EMAIL_VERIFICATION_SIGNATURE_BYTES = 64;
exports.PASSWORD_RESET_BYTES = 40;
exports.PASSWORD_RESET_TIMEOUT = ONE_HOUR;
//# sourceMappingURL=auth.js.map