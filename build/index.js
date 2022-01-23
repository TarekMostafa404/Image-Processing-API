'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const images_1 = __importDefault(require('./routes/images'));
const app = (0, express_1.default)();
const port = 3000;
app.use('/', images_1.default);
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
exports.default = app;
