import express from "express";
import sharp from "sharp";
const routes = express.Router();
import fs from "fs";
import { readFile } from "fs";
import ImageService from "../services/ImageService";

const fullImagesDir = `${__dirname}/images/`;
const resizedImagesDir = `${__dirname}/images/resized/`;

routes.get("/image", (req, res) => {
  const imageName = `${req.query.name}`;
  const fullImagePath = `${fullImagesDir}${imageName}`;
  const resizedImagePath = `${resizedImagesDir}${imageName}`;

  if (fs.existsSync(resizedImagePath)) {
    res.sendFile(resizedImagePath);
  } else if (!fs.existsSync(fullImagePath)) {
    res.send("Image Not Found");
  } else {
    ImageService.resizeImage(fullImagePath, resizedImagePath)
      .then((data) => {
        res.sendFile(resizedImagePath);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

export default routes;
