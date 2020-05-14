"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const app_1 = require("./app");
(async () => {
    await mongoose_1.default.connect(config_1.MONGO_URI, config_1.MONGO_OPTIONS);
    const app = app_1.createApp();
    app.listen(config_1.APP_PORT, () => console.log(`http://localhost${config_1.APP_PORT}`));
})();
//# sourceMappingURL=index.js.map