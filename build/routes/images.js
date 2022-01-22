/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const routes = express_1.default.Router();
const fs_1 = __importDefault(require('fs'));
const ImageService_1 = __importDefault(require('../services/ImageService'));
const fullImagesDir = `${__dirname}/images/`;
const resizedImagesDir = `${__dirname}/images/resized/`;
routes.get('/image', (req, res) => {
    const imageName = `${req.query.name}`;
    const fullImagePath = `${fullImagesDir}${imageName}`;
    const resizedImagePath = `${resizedImagesDir}${imageName}`;
    if (fs_1.default.existsSync(resizedImagePath)) {
        res.sendFile(resizedImagePath);
    }
    else if (!fs_1.default.existsSync(fullImagePath)) {
        res.send('Image Not Found');
    }
    else {
        ImageService_1.default.resizeImage(fullImagePath, resizedImagePath)
            .then((_data) => {
            res.sendFile(resizedImagePath);
        })
            .catch((err) => {
            res.send(err);
        });
    }
});
exports.default = routes;
