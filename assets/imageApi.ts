import express from 'express';
import fs from 'fs';
import ImageService from '../src/services/ImageService';

const routes = express.Router();

const fullImagesDir = `${__dirname}/fullImages/`;
const resizedImagesDir = `${__dirname}/resizedImages/`;

routes.get('/api', (req, res) => {
  const imageWidth = parseInt((req.query.width || '0').toString());
  const imageHeight = parseInt((req.query.height || '0').toString());
  const imageName = `${req.query.name}`;

  if (imageWidth === 0 || imageHeight === 0) {
    res.status(400).send('invalid dimention values');
    return;
  }
  const fullImagePath = `${fullImagesDir}${imageName}`;
  const resizedImagePath = `${resizedImagesDir}${imageWidth}_${imageHeight}_${imageName}`;

  if (fs.existsSync(resizedImagePath)) {
    fs.readFile(resizedImagePath, (err, data) => {
      res.type('image/jpg').send(data);
      console.log(resizedImagePath);
      console.log(err);
    });
  } else if (!fs.existsSync(fullImagePath)) {
    res.status(404).send(fullImagePath);
  } else {
    if (!fs.existsSync(resizedImagesDir)) {
      fs.mkdirSync(resizedImagesDir, { recursive: true });
    }
    ImageService.resizeImage(
      fullImagePath,
      resizedImagePath,
      imageWidth,
      imageHeight
    )
      .then(() => {
        fs.readFile(resizedImagePath, (err, data) => {
          res.type('image/jpg').send(data);
          console.log(resizedImagePath);
          console.log(err);
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

export default routes;
