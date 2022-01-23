"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageApi_1 = __importDefault(require("./routes/assets/imageApi"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/', imageApi_1.default);
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
exports.default = app;
