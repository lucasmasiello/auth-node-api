"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reset_1 = require("../actions/reset");
const router = express_1.Router();
router.post('/password/email', reset_1.emailReset);
router.post('/password/reset', reset_1.reset);
exports.default = router;
//# sourceMappingURL=reset.js.map