"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
const formatMessage = (message, callId) => {
    message = {
        callId,
        ...message
    };
    return JSON.stringify(message);
};
class Logger {
    constructor(callId) {
        this.callId = callId;
    }
    log(level, message) {
        winston_1.default.log(level, formatMessage(message, this.callId));
    }
    error(message) {
        winston_1.default.error(formatMessage(message, this.callId));
    }
    warn(message) {
        winston_1.default.warn(formatMessage(message, this.callId));
    }
    verbose(message) {
        winston_1.default.verbose(formatMessage(message, this.callId));
    }
    info(message) {
        winston_1.default.info(formatMessage(message, this.callId));
    }
    debug(message) {
        winston_1.default.debug(formatMessage(message, this.callId));
    }
    silly(message) {
        winston_1.default.silly(formatMessage(message, this.callId));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map