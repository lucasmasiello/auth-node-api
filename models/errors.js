"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.BadRequest = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(status, code, message, innerError) {
        super(message);
        this.status = status;
        this.code = code;
        this.innerError = innerError;
    }
}
exports.HttpError = HttpError;
class BadRequest extends HttpError {
    constructor(status = 400, code = 'BAD_REQUEST', message = 'bad request', innerError) {
        super(status, code, message, innerError || undefined);
    }
}
exports.BadRequest = BadRequest;
class Unauthorized extends HttpError {
    constructor(status = 401, code = 'UNAUTHORIZED', message = 'Unauthorized', innerError) {
        super(status, code, message, innerError || undefined);
    }
}
exports.Unauthorized = Unauthorized;
//# sourceMappingURL=errors.js.map