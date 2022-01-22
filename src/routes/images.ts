import express from "express";
import sharp from "sharp";
const routes = express.Router();
import fs from "fs";
import { readFile } from "fs";

const fullImagesDir = `${__dirname}/images/`;
const resizedImagesDir = `${__dirname}/images/resized/`;

routes.get("/image", (req, res) => {
  const imageName = `${req.query.name}`;
  const fullImagePath = `${fullImagesDir}${imageName}`;
  const resizedImagePath = `${resizedImagesDir}${imageName}`;

  /*
1. check if image exist in image folder
1.2 if image not found throw image not found
2. check if image exist in resized folder 
2.1 if not => resize image
3. return resized image
*/
// res.sendFile(imagePath, { root: __dirname });

  if (fs.existsSync(resizedImagePath)) {
    res.sendFile(resizedImagePath);
  } else if (!fs.existsSync(fullImagePath)) {
    res.send("Image Not Found");
  } else {
    sharp(fullImagePath)
      .resize(200, 200)
      .jpeg()
      .toFile(resizedImagePath)
      .then((data) => {
          res.sendFile(resizedImagePath);
      });
  }
});

export default routes;
