"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
class ImageService {
    static resizeImage(fullImagePath, resizedImagePath, width, height) {
        return (0, sharp_1.default)(fullImagePath)
            .resize(width, height)
            .jpeg()
            .toFile(resizedImagePath);
    }
}
exports.default = ImageService;
