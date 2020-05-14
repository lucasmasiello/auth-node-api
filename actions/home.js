"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const middlewares_1 = require("../middlewares");
exports.home = middlewares_1.catchAsync(async (req, res) => {
    return res.json({ user: req.context.user });
});
//# sourceMappingURL=home.js.map