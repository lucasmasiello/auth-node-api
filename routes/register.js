"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actions_1 = require("../actions");
const router = express_1.Router();
router.post('/register', actions_1.register);
exports.default = router;
//# sourceMappingURL=register.js.map