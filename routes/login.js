"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actions_1 = require("../actions");
const router = express_1.Router();
router.post('/login', actions_1.login);
exports.default = router;
//# sourceMappingURL=login.js.map