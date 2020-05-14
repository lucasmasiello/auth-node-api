"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const express_http_context_1 = require("express-http-context");
const uuid_1 = require("uuid");
const routes_1 = require("./routes");
const middlewares_1 = require("./middlewares");
const context_1 = require("./models/context");
const helpers_1 = require("./helpers");
exports.createApp = () => {
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(express_http_context_1.middleware);
    app.use((req, res, next) => {
        const context = new context_1.Context(uuid_1.v1(), new helpers_1.Logger(uuid_1.v1()));
        req.context = context;
        next();
    });
    app.use(routes_1.login);
    app.use(routes_1.register);
    app.use(routes_1.home);
    app.use(routes_1.verify);
    app.use(routes_1.reset);
    app.use(middlewares_1.notFound);
    app.use(middlewares_1.serverError);
    return app;
};
//# sourceMappingURL=app.js.map