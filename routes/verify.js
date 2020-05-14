"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_1 = require("../actions/verify");
const router = express_1.Router();
router.get('/verify-user', verify_1.verify);
router.post('/verify-user/resend', verify_1.resend);
exports.default = router;
//# sourceMappingURL=verify.js.map