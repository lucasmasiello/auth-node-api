"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.notFound = exports.catchAsync = void 0;
exports.catchAsync = (handler) => (...args) => handler(...args).catch(args[2]);
exports.notFound = (req, res) => {
    res.status(404).json({
        errorCode: 'NOT_FOUND',
        errorMessage: 'Not Found'
    });
};
exports.serverError = (err, req, res) => {
    if (!err.status) {
        console.error(err.stack);
    }
    res
        .status(err.status || 500)
        .json({
        errorCode: err.code || 'BAD_GATEWAY',
        errorMessage: err.message || 'Internal Server Error',
        errorDetails: err.innerError
    });
};
//# sourceMappingURL=errors.js.map