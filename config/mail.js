"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_FROM = exports.SMTP_OPTIONS = void 0;
const app_1 = require("./app");
const { SMTP_HOST = 'in-v3.mailjet.com', SMTP_PORT = 25, SMTP_USERNAME = '48c7a8d00504040985c96afea86f2a9c', SMTP_PASSWORD = '84d90a2d8c233b8cdcffa9d5aea7235b' } = process.env;
exports.SMTP_OPTIONS = {
    host: SMTP_HOST,
    port: +SMTP_PORT,
    secure: app_1.IN_PROD,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
    }
};
exports.MAIL_FROM = 'lucasgr90@gmail.com';
//# sourceMappingURL=mail.js.map