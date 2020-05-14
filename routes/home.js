"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const home_1 = require("../actions/home");
const router = express_1.Router();
router.get('/home', middlewares_1.auth, home_1.home);
exports.default = router;
//# sourceMappingURL=home.js.map